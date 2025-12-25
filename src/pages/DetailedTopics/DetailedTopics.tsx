import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Progress from '../../components/Progress/Progress'
import { routes } from '../../router/constants'
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics'
import { useCleaned } from '../../hooks/useCleaned'
import TopicsPlaceholder from '../../placeholders/TopicsPlaceholder'
import { useFirebase } from '../../contexts/FirebaseContext'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language } from '../../enums'
import { getStatisticByFirebaseGroup } from '../../helpers'
import InFavoriteLink from '../../components/InFavoriteLink/InFavoriteLink'
import s from './../Topics/Topics.module.scss'
import { questionCountText } from '../../helpers/text'
import { FirebaseGroup } from '../../types'
import IsErrorsLink from '../../components/IsErrorsLink/IsErrorsLink'

const DetailedTopics: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { onCleaned } = useCleaned()
  const { fetchGroups } = useFirebase()

  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const allQuestionsStatistic = useMemo(
    () => StatisticsStore.getAllQuestionsStatistics(i18n.language as Language),
    []
  )

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups()
      console.log('fetchedGroups', fetchedGroups)
      setGroups(fetchedGroups)
    }

    setLoading(true)
    getGroups().finally(() => setLoading(false))
  }, [fetchGroups])

  // TODO: fix this
  // useEffect(() => {
  //   const onStorageEvent = () => {
  //     setFavoriteQuestions(getFavotiteQuestions(questions))
  //   }
  //
  //   window.addEventListener('storage', onStorageEvent, false)
  //
  //   return () => {
  //     window.removeEventListener('storage', onStorageEvent, false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  if (loading) {
    return <TopicsPlaceholder />
  }

  return (
    <>
      <Container>
        <Grid container className={s.topicsTitle} mt={3} mb={1}>
          <Grid item xs={7} sm={8} md={9}>
            {t('topic')}
          </Grid>
          <Grid item xs={5} sm={4} md={3} textAlign={'right'}>
            <div className={s.count}>
              <div>{t('isErrors')}</div>
              <div>{t('inFavorite')}</div>
              <div>{t('solved')}</div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Grid container>
        <div className='line' />
      </Grid>

      <Container>
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
                      {' '}/{' '}
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
      </Container>
    </>
  )
}

export default DetailedTopics
