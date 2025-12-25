import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup, FirebaseQuestionState, Question } from '../../types'
import QuestionCheckStatusWithInitialValue from '../../components/QuestionCheckStatus/QuestionCheckStatusWithInitialValue'
import s from './CheckQuestions.module.scss'
import ru2026Data from '../../data/ru_2026.json'

type Ru2026QuestionRaw = {
  id: number
  gid: string
  tid: string
  q: string
  a1: string
  a2: string
  a3: string
  a4: string
  a5: string
  a6: string
  correct: string
  img: string
}

type Ru2026Question = Ru2026QuestionRaw & {
  findValue: string
  updatedAt?: string
  oldId?: string
}

type LeftQuestion = Question & {
  findValue: string
}

const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^a-zA-Zа-яёА-ЯЁ0-9]/g, '')
}

const ru2026InitialData: Ru2026Question[] = (ru2026Data as Ru2026QuestionRaw[]).map((q) => ({
  ...q,
  findValue: normalizeText(q.q),
}))

const CheckQuestions = () => {
  const { getQuestionsStates } = useFirebase()
  const { content } = useAppState()
  const { fetchGroups } = useFirebase()
  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  const [questionStates, setQuestionStates] = useState<Record<string, FirebaseQuestionState>>({})
  const [ru2026Questions, setRu2026Questions] = useState<Ru2026Question[]>(ru2026InitialData)
  const [leftQuestions, setLeftQuestions] = useState<LeftQuestion[]>([])
  const [sendingQuestions, setSendingQuestions] = useState<Record<number, boolean>>({})

  // Загрузка данных с облака при старте
  useEffect(() => {
    const fetchCloudQuestions = async () => {
      try {
        const response = await fetch('https://api.metriki.cc/pdd')
        if (response.ok) {
          const cloudQuestions: Array<{ id: number; content: Ru2026Question }> = await response.json()

          setRu2026Questions((prev) => {
            return prev.map((q) => {
              const cloudQuestion = cloudQuestions.find((cq) => cq.id === q.id)
              if (cloudQuestion) {
                return {
                  ...cloudQuestion.content,
                  findValue: normalizeText(cloudQuestion.content.q),
                }
              }
              return q
            })
          })
        }
      } catch (error) {
        console.error('Ошибка загрузки с облака:', error)
      }
    }

    fetchCloudQuestions()
  }, [])

  useEffect(() => {
    if (content.questions.length > 0) {
      const processed = content.questions.map((q) => ({
        ...q,
        findValue: normalizeText(q.q),
      }))
      setLeftQuestions(processed)
    }
  }, [content.questions])

  const handleMatchQuestion = async (question: Ru2026Question) => {
    setSendingQuestions((prev) => ({ ...prev, [question.id]: true }))

    const now = new Date()
    const dateStr = now.toLocaleDateString('ru-RU')
    const timeStr = now.toLocaleTimeString('ru-RU')
    const updatedAt = `Обновлено ${dateStr}, ${timeStr}`

    const questionWithUpdate: Ru2026Question = {
      ...question,
      updatedAt,
    }

    try {
      const response = await fetch(`https://api.metriki.cc/pdd/${question.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: question.id,
          content: questionWithUpdate,
        }),
      })

      if (response.ok) {
        setRu2026Questions((prev) =>
          prev.map((q) => (q.id === question.id ? questionWithUpdate : q))
        )
      } else {
        alert(`Ошибка отправки: ${response.status}`)
      }
    } catch (error) {
      console.error(error)
      alert('Ошибка сети при отправке')
    } finally {
      setSendingQuestions((prev) => ({ ...prev, [question.id]: false }))
    }
  }

  const downloadJson = () => {
    const jsonString = JSON.stringify(ru2026Questions, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ru_2026_edited.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const getGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups()
        setGroups(fetchedGroups)
      } catch (error) {
        console.error(error)
        alert('Error get fetchGroups!')
      }
    }

    getGroups()
  }, [fetchGroups])

  useEffect(() => {
    const fetchQuestionsStates = async () => {
      try {
        const states = await getQuestionsStates()
        const statesHash = states.reduce<Record<string, FirebaseQuestionState>>((acc, curr) => {
          acc[curr.qAppId] = curr
          return acc
        }, {})
        setQuestionStates(statesHash)

        console.log(states)
      } catch (error) {
        console.error(error)
        alert('Error get fetchQuestionsStates!')
      }
    }

    fetchQuestionsStates()
  }, [])

  const questionsToGroupIdsHash = groups.reduce<Record<string, string[]>>((acc, currGroup) => {
    currGroup.questionIds.forEach((qId) => {
      if (acc[qId]) {
        acc[qId].push(currGroup.id)
      } else {
        acc[qId] = [currGroup.id]
      }
    })

    return acc
  }, {})

  const groupsHash = groups.reduce<Record<string, FirebaseGroup>>((acc, currGroup) => {
    acc[currGroup.id] = currGroup
    return acc
  }, {})

  const getGroupNameById = (id: string) => {
    return groupsHash[id]?.name || <span style={{ color: 'red' }}>NONE</span>
  }

  console.log(groups)

  const maxLength = Math.max(leftQuestions.length, ru2026Questions.length)

  return (
    <div>
      <h1>Check Questions</h1>

      <Grid container spacing={2} style={{ marginBottom: '16px' }}>
        <Grid item xs={6}>
          <h2>Текущие вопросы (ru.json) — {leftQuestions.length}</h2>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ margin: 0 }}>Вопросы 2026 (ru_2026.json) — {ru2026Questions.length}</h2>
            <button onClick={downloadJson} className={s.downloadBtn}>
              Скачать JSON
            </button>
          </div>
        </Grid>
      </Grid>

      {Array.from({ length: maxLength }).map((_, index) => {
        const leftQuestion = leftQuestions[index]
        const rightQuestion = ru2026Questions[index]
        const groupsIds = leftQuestion ? questionsToGroupIdsHash?.[leftQuestion.id] : null

        return (
          <Grid container spacing={4} key={index} className={s.row}>
            {/* Левая колонка - текущий вопрос */}
            <Grid item xs={6}>
              {leftQuestion ? (
                <div className={s.questionBlock}>
                  <div className={s.questionId}>id: {leftQuestion.id}</div>

                  <div className={s.questionImage}>
                    {leftQuestion.img ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/questions/${leftQuestion.gid}/${leftQuestion.img}.jpg`}
                        alt=''
                      />
                    ) : (
                      <div>без изображения</div>
                    )}
                  </div>

                  <div className={s.questionText}>
                    <b>{leftQuestion.q}</b>
                  </div>

                  <ul className={s.ul}>
                    {leftQuestion.a1 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a1' })}>
                        1. {leftQuestion.a1}
                        {leftQuestion?.policeCorrect === 'a1' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                    {leftQuestion.a2 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a2' })}>
                        2. {leftQuestion.a2}
                        {leftQuestion?.policeCorrect === 'a2' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                    {leftQuestion.a3 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a3' })}>
                        3. {leftQuestion.a3}
                        {leftQuestion?.policeCorrect === 'a3' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                    {leftQuestion.a4 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a4' })}>
                        4. {leftQuestion.a4}
                        {leftQuestion?.policeCorrect === 'a4' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                    {leftQuestion.a5 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a5' })}>
                        5. {leftQuestion.a5}
                        {leftQuestion?.policeCorrect === 'a5' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                    {leftQuestion.a6 && (
                      <li className={clsx({ [s.active]: leftQuestion.correct === 'a6' })}>
                        6. {leftQuestion.a6}
                        {leftQuestion?.policeCorrect === 'a6' && <div className={s.policeAnswer} />}
                      </li>
                    )}
                  </ul>

                  <div style={{ marginTop: '20px' }}>
                    <QuestionCheckStatusWithInitialValue
                      questionId={leftQuestion.id}
                      initialQuestionState={questionStates?.[leftQuestion.id]}
                    />
                  </div>

                  <div className={s.questionMeta}>
                    {groupsIds ? (
                      <ul>
                        <li>
                          <b>{leftQuestion.id}</b>
                        </li>
                        {groupsIds.map((gId) => (
                          <li key={gId}>
                            <b>{getGroupNameById(gId)}</b>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: 'red' }}>NONE</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={s.emptyBlock}>—</div>
              )}
            </Grid>

            {/* Правая колонка - вопрос из ru_2026.json */}
            <Grid item xs={6}>
              {rightQuestion ? (
                <div className={s.questionBlock}>
                  <div className={s.questionId}>id: {rightQuestion.id}</div>

                  <div className={s.questionImage}>
                    {rightQuestion.img ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/questions/${rightQuestion.gid}/${rightQuestion.img}.jpg`}
                        alt=''
                      />
                    ) : (
                      <div>без изображения</div>
                    )}
                  </div>

                  <div className={s.questionText}>
                    <b>{rightQuestion.q}</b>
                  </div>

                  <ul className={s.ul}>
                    {rightQuestion.a1 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a1' })}>
                        1. {rightQuestion.a1}
                      </li>
                    )}
                    {rightQuestion.a2 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a2' })}>
                        2. {rightQuestion.a2}
                      </li>
                    )}
                    {rightQuestion.a3 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a3' })}>
                        3. {rightQuestion.a3}
                      </li>
                    )}
                    {rightQuestion.a4 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a4' })}>
                        4. {rightQuestion.a4}
                      </li>
                    )}
                    {rightQuestion.a5 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a5' })}>
                        5. {rightQuestion.a5}
                      </li>
                    )}
                    {rightQuestion.a6 && (
                      <li className={clsx({ [s.active]: rightQuestion.correct === 'a6' })}>
                        6. {rightQuestion.a6}
                      </li>
                    )}
                  </ul>

                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label>old-id:</label>
                    <input
                      type="text"
                      defaultValue={rightQuestion.oldId ?? leftQuestion?.id ?? ''}
                      id={`oldId-${rightQuestion.id}`}
                      className={s.oldIdInput}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const input = document.getElementById(`oldId-${rightQuestion.id}`) as HTMLInputElement
                        if (input) {
                          setRu2026Questions((prev) =>
                            prev.map((q) =>
                              q.id === rightQuestion.id ? { ...q, oldId: input.value } : q
                            )
                          )
                        }
                      }}
                    >
                      Сохранить
                    </Button>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <LoadingButton
                      onClick={() => handleMatchQuestion(rightQuestion)}
                      loading={sendingQuestions[rightQuestion.id]}
                      disabled={sendingQuestions[rightQuestion.id]}
                      variant="outlined"
                      size="small"
                      color={rightQuestion.updatedAt ? 'info' : 'secondary'}
                    >
                      {rightQuestion.updatedAt || 'Вопросы совпадают'}
                    </LoadingButton>
                  </div>
                </div>
              ) : (
                <div className={s.emptyBlock}>—</div>
              )}
            </Grid>

            <Grid item xs={12}>
              <hr style={{ opacity: 0.2, margin: '16px 0' }} />
            </Grid>
          </Grid>
        )
      })}
    </div>
  )
}

export default CheckQuestions
