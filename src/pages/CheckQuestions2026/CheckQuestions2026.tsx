import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup } from '../../types'
import ru2026Data from '../../data/ru_2026.json'
import s from '../CheckQuestions/CheckQuestions.module.scss'
import AddQuestion from '../../components/Firebase/AddQuestion'

type Question = {
  id: number
  gid: string
  tid: string
  q: string
  a1: string
  a2?: string
  a3?: string
  a4?: string
  a5?: string
  a6?: string
  correct: string
  img: string
  oldId?: number
}

const questions = ru2026Data as Question[]

const CheckQuestions2026 = () => {
  const { fetchGroups } = useFirebase()
  const [groups, setGroups] = useState<FirebaseGroup[]>([])

  useEffect(() => {
    fetchGroups().then(setGroups).catch(console.error)
  }, [])

  const handleGroupsChange = useCallback((updated: FirebaseGroup[]) => {
    setGroups(updated)
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <h1>Вопросы 2026 — {questions.length}</h1>

      {questions.map((q) => (
        <Grid container spacing={4} key={q.id} className={s.row} style={{ marginBottom: '8px' }}>
          <Grid item xs={6}>
            <div className={s.questionBlock}>
              <div className={s.questionId}>id: {q.id}</div>

              <div className={s.questionImage}>
                {q.img ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/questions/${q.gid}/${q.img}.jpg`}
                    alt=''
                  />
                ) : (
                  <div>без изображения</div>
                )}
              </div>

              <div className={s.questionText}>
                <b>{q.q}</b>
              </div>

              <ul className={s.ul}>
                {q.a1 && <li className={clsx({ [s.active]: q.correct === 'a1' })}>1. {q.a1}</li>}
                {q.a2 && <li className={clsx({ [s.active]: q.correct === 'a2' })}>2. {q.a2}</li>}
                {q.a3 && <li className={clsx({ [s.active]: q.correct === 'a3' })}>3. {q.a3}</li>}
                {q.a4 && <li className={clsx({ [s.active]: q.correct === 'a4' })}>4. {q.a4}</li>}
                {q.a5 && <li className={clsx({ [s.active]: q.correct === 'a5' })}>5. {q.a5}</li>}
                {q.a6 && <li className={clsx({ [s.active]: q.correct === 'a6' })}>6. {q.a6}</li>}
              </ul>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={s.questionBlock}>
              {q.oldId && (
                <div style={{ marginBottom: '8px', color: '#888', fontSize: '13px' }}>
                  old-id: {q.oldId}
                </div>
              )}
              {/*{q.oldId ? (*/}
              {/*  <AddQuestion questionId={q.oldId} groups={groups} onGroupsChange={handleGroupsChange} />*/}
              {/*) : (*/}
              {/*  <span style={{ color: 'red' }}>NONE</span>*/}
              {/*)}*/}
            </div>
          </Grid>

          <Grid item xs={12}>
            <hr style={{ opacity: 0.2, margin: '8px 0' }} />
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default CheckQuestions2026
