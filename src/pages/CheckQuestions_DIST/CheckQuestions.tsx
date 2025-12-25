import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup, FirebaseQuestionState } from '../../types'
import QuestionCheckStatusWithInitialValue from '../../components/QuestionCheckStatus/QuestionCheckStatusWithInitialValue'
import s from './CheckQuestions.module.scss'

const CheckQuestions = () => {
  const { getQuestionsStates } = useFirebase()
  const { content } = useAppState()
  const { fetchGroups } = useFirebase()
  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  const [questionStates, setQuestionStates] = useState<Record<string, FirebaseQuestionState>>({})

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

  return (
    <div>
      <h1>Check Questions</h1>

      {content.questions.map((q) => {
        const groupsIds = questionsToGroupIdsHash?.[q.id]
        return (
          <Grid container spacing={3} className={s.container}>
            <Grid item xs={12}>
              {q.img && (
                <img src={`${process.env.PUBLIC_URL}/images/questions/${q.gid}/${q.img}.jpg`} alt='' />
              )}
              {!q.img && <div>без изображения</div>}
            </Grid>

            <Grid item xs={12}>
              <b>{q.q}</b>
            </Grid>

            <Grid item xs={7}>
              <ul className={s.ul}>
                {q.a1 && (
                  <li className={clsx({ [s.active]: q.correct === 'a1' })}>
                    1. {q.a1}
                    {q?.policeCorrect === 'a1' && <div className={s.policeAnswer} />}
                  </li>
                )}
                {q.a2 && (
                  <li className={clsx({ [s.active]: q.correct === 'a2' })}>
                    2. {q.a2}
                    {q?.policeCorrect === 'a2' && <div className={s.policeAnswer} />}
                  </li>
                )}
                {q.a3 && (
                  <li className={clsx({ [s.active]: q.correct === 'a3' })}>
                    3. {q.a3}
                    {q?.policeCorrect === 'a3' && <div className={s.policeAnswer} />}
                  </li>
                )}
                {q.a4 && (
                  <li className={clsx({ [s.active]: q.correct === 'a4' })}>
                    4. {q.a4}
                    {q?.policeCorrect === 'a4' && <div className={s.policeAnswer} />}
                  </li>
                )}
                {q.a5 && (
                  <li className={clsx({ [s.active]: q.correct === 'a5' })}>
                    5. {q.a5}
                    {q?.policeCorrect === 'a5' && <div className={s.policeAnswer} />}
                  </li>
                )}
                {q.a6 && (
                  <li className={clsx({ [s.active]: q.correct === 'a6' })}>
                    6. {q.a6}
                    {q?.policeCorrect === 'a6' && <div className={s.policeAnswer} />}
                  </li>
                )}
              </ul>
            </Grid>

            <Grid item xs={5}>
              <QuestionCheckStatusWithInitialValue
                questionId={q.id}
                initialQuestionState={questionStates?.[q.id]}
              />
            </Grid>

            <Grid item xs={12}>
              {groupsIds ? (
                <ul>
                  <li>
                    <b>{q.id}</b>
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
            </Grid>
            <Grid item xs={12}>
              <hr style={{ opacity: 0.2 }} />
            </Grid>
          </Grid>
        )
      })}
    </div>
  )
}

export default CheckQuestions
