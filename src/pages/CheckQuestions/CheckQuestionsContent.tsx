import React from 'react'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import { FirebaseGroup, FirebaseQuestionState } from '../../types'
import QuestionCheckStatusWithInitialValue from '../../components/QuestionCheckStatus/QuestionCheckStatusWithInitialValue'
import RightQuestionBlock from './RightQuestionBlock'
import s from './CheckQuestions.module.scss'
import { Ru2026Question, LeftQuestion } from './CheckQuestionsLoader'

type Props = {
  groups: FirebaseGroup[]
  questionStates: Record<string, FirebaseQuestionState>
  ru2026Questions: Ru2026Question[]
  leftQuestions: LeftQuestion[]
}

const CheckQuestionsContent = ({ groups, questionStates, ru2026Questions, leftQuestions }: Props) => {
  const downloadCloudJson = async () => {
    try {
      const response = await fetch('http://localhost:8888/pdd')
      if (!response.ok) throw new Error('Ошибка загрузки')
      const data = await response.json()
      const transformed = data.map((item: { id: number; content: unknown }) => item.content)
      const jsonString = JSON.stringify(transformed, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'pdd_cloud.json'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      alert('Ошибка при скачивании')
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

  const maxLength = Math.max(leftQuestions.length, ru2026Questions.length)

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={downloadCloudJson} className={s.downloadBtn}>
          Скачать облако (pdd_cloud.json)
        </button>
      </div>

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
        const rightGroupsIds = rightQuestion?.oldId ? questionsToGroupIdsHash?.[rightQuestion.oldId] : undefined

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

                  <div style={{ display: 'none' }}>
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
                <RightQuestionBlock
                  newQuestion={rightQuestion}
                  oldQuestion={leftQuestion}
                  groupsIds={rightGroupsIds}
                  getGroupNameById={getGroupNameById}
                />
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

export default CheckQuestionsContent
