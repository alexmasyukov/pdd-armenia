import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Progress from '../../components/Progress/Progress'
import { routes } from '../../router/constants'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language } from '../../enums'
import { getStatisticByFirebaseGroup } from '../../helpers'
import { questionCountText } from '../../helpers/text'
import s from './../Topics/Topics.module.scss'
import { theoryGroups } from './groups'

const TheoryGroups: React.FC = () => {
  const allQuestionsStatistic = useMemo(() => StatisticsStore.getAllQuestionsStatistics(Language.Russian), [])

  return (
    <>
      <Grid container className={s.topicsTitle}>
        <Grid item xs={7} sm={8} md={9}>
          Числа в ПДД: вопросы по разделам шпаргалки
        </Grid>
        <Grid item xs={5} sm={4} md={3} textAlign={'right'}>
          <div className={s.count}>
            <div>Решено</div>
          </div>
        </Grid>
      </Grid>

      <div className='line' />

      {theoryGroups.map((group, index) => {
        const stat = getStatisticByFirebaseGroup({
          firebaseGroupQuestionIds: group.questionIds.map((id) => Number(id)),
          allQuestionsStatistic,
        })

        return (
          <React.Fragment key={group.id}>
            <Grid container spacing={1} mb={2} mt={index === 0 ? 2 : 0} className={s.topic}>
              <Grid item xs={7} sm={8} md={9}>
                <Link to={routes.theory.questionsById.view(group.id)}>{group.name}</Link>
                <div className='questions-count'>{questionCountText(group.questionIds.length)}</div>
              </Grid>
              <Grid item xs={5} sm={4} md={3} textAlign={'right'}>
                <div className={s.count}>
                  <div>
                    <span>{stat.correct}</span> / <span>{stat.wrong}</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Progress
                  variant='secondary'
                  max={group.questionIds.length}
                  value={stat.correct}
                  secondValue={stat.wrong}
                />
              </Grid>
            </Grid>

            {index !== theoryGroups.length - 1 && (
              <Grid container mb={1}>
                <Grid item xs={12}>
                  <div className={s.hr} />
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default TheoryGroups
