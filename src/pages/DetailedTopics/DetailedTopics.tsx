import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Progress from '../../components/Progress/Progress'
import { routes } from '../../router/constants'
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics'
import { useCleaned } from '../../hooks/useCleaned'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language } from '../../enums'
import { getStatisticByFirebaseGroup } from '../../helpers'
import InFavoriteLink from '../../components/InFavoriteLink/InFavoriteLink'
import s from './../Topics/Topics.module.scss'
import { questionCountText } from '../../helpers/text'
import IsErrorsLink from '../../components/IsErrorsLink/IsErrorsLink'
import groupsData from '../../data/groups-version-2.json'

type DetailedGroup = {
  id: string
  name: string
  order: number
  questionIds: string[]
}

const groups = groupsData as DetailedGroup[]

const DetailedTopics: React.FC = () => {
  const { onCleaned } = useCleaned()

  const allQuestionsStatistic = useMemo(
    () => StatisticsStore.getAllQuestionsStatistics(Language.Russian),
    []
  )

  return (
    <>
      <Grid container className={s.topicsTitle} mt={3} mb={1}>
        <Grid item xs={7} sm={8} md={9}>
          Тема
        </Grid>
        <Grid item xs={5} sm={4} md={3} textAlign={'right'}>
          <div className={s.count}>
            <div>Ошибки</div>
            <div>Избранное</div>
            <div>Решено</div>
          </div>
        </Grid>
      </Grid>

      <div className='line' />

      {groups.map((group, index) => {
          const stat = getStatisticByFirebaseGroup({
            firebaseGroupQuestionIds: group.questionIds.map((id) => Number(id)),
            allQuestionsStatistic,
          })

          return (
            <React.Fragment key={group.id}>
              <Grid container spacing={1} mb={2} mt={index === 0 ? 2 : 0} className={s.topic}>
                <Grid item xs={7} sm={8} md={9}>
                  <Link to={routes.detailedTopics.topicById.view(group.id)}>{group.name}</Link>
                  <div className='questions-count'>{questionCountText(group.questionIds.length)}</div>
                </Grid>
                <Grid item xs={5} sm={4} md={3} textAlign={'right'}>
                  <div className={s.count}>
                    <div>{stat.wrong ? <IsErrorsLink count={stat.wrong} topicId={group.id} /> : <></>}</div>
                    <div>
                      {stat.inFavorite ? (
                        <InFavoriteLink count={stat.inFavorite} topicId={group.id} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <span>{stat.correct}</span>
                      {' '}/{' '}
                      <span>{stat.wrong}</span>
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

              <Grid container mb={1}>
                {index !== groups.length - 1 && (
                  <Grid item xs={12}>
                    <div className={s.hr} />
                  </Grid>
                )}
              </Grid>
            </React.Fragment>
          )
        })}

      <Grid container mb={1} justifyContent='flex-end'>
        <CleanAllStatistics onCleaned={onCleaned} />
      </Grid>
    </>
  )
}

export default DetailedTopics
