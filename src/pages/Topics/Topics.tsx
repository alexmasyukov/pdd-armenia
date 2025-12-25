import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Progress from '../../components/Progress/Progress'
import { getStatisticsByGroup } from '../../helpers'
import { routes } from '../../router/constants'
import { Language } from '../../enums'
import { StatisticsStore } from '../../services/StatisticsStore'
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics'
import { useCleaned } from '../../hooks/useCleaned'
import InFavoriteLink from '../../components/InFavoriteLink/InFavoriteLink'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicsPlaceholder from '../../placeholders/TopicsPlaceholder'
import s from './Topics.module.scss'
import { pluralize } from '../../helpers/text'

const Topics: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { onCleaned } = useCleaned()
  const { content } = useAppState()

  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(i18n.language as Language)

  if (content.loading) {
    return <TopicsPlaceholder />
  }

  return (
    <>
      <Container>
        <Grid container className={s.topicsTitle} mt={3} mb={1}>
          <Grid item xs={7} sm={9} md={10}>
            {t('topic')}
          </Grid>
          <Grid item xs={5} sm={3} md={2} textAlign={'right'}>
            <div className={s.count}>
              <div>{t('inFavorite')}</div>
              <div>{t('solved')}</div>
              {/* <div>{t('total')}</div> */}
            </div>
          </Grid>
        </Grid>
      </Container>

      <Grid container>
        <div className='line' />
      </Grid>

      <Container>
        {content.groups.map((group, index) => {
          const statistics = getStatisticsByGroup(group.id, questionsStatistics, {
            groups: content.groups,
            questions: content.questions,
          })

          return (
            <React.Fragment key={group.id}>
              <Grid container spacing={1} mb={2} mt={index === 0 ? 2 : 0} className={s.topic}>
                <Grid item xs={7} sm={9} md={10}>
                  <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
                  <div className='questions-count'>
                    {statistics.questionsCount}{' '}
                    {pluralize(statistics.questionsCount, 'вопрос', 'вопроса', 'вопросов')}
                  </div>
                </Grid>
                <Grid item xs={5} sm={3} md={2} textAlign={'right'}>
                  <div className={s.count}>
                    <div>
                      {statistics.inFavorite ? (
                        <InFavoriteLink count={statistics.inFavorite} topicId={group.id} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <span>{statistics.correct}</span>
                      {' '}/{' '}
                      <span>{statistics.wrong}</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Progress
                    variant='secondary'
                    max={statistics.questionsCount}
                    value={statistics.correct}
                    secondValue={statistics.wrong}
                  />
                </Grid>
              </Grid>

              <Grid container mb={1}>
                {index !== content.groups.length - 1 && (
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
      </Container>
    </>
  )
}

export default Topics
