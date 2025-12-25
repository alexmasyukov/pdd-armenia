import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Progress from '../Progress/Progress'
import { StatisticsStore } from '../../services/StatisticsStore'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { Language } from '../../enums'
import s from './HomeStatistic.module.scss'

const HomeStatistic = () => {
  const { t, i18n } = useTranslation()
  const { content } = useAppState()

  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(i18n.language as Language)
  const questionsCount = Object.keys(questionsStatistics).length

  const allQuestionsCount = content.questions.length
  const allTopicsCount = content.groups.length

  return (
    <Grid container spacing={3} justifyContent='space-between'>
      <Grid item xs={6}>
        <div className={s.item}>
          <span>
            <span>{questionsCount}</span> / {allQuestionsCount}
          </span>
          <Progress className={s.bar} max={allQuestionsCount} value={questionsCount} />
          <span>{t('questions')}</span>
        </div>
      </Grid>
      {/* <Grid item xs={4}>
        <div className={s.item}>
          <span>
            <span>0</span> / {tickets}
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('tickets')}</span>
        </div>
      </Grid> */}
      <Grid item xs={6}>
        <div className={s.item}>
          <span>
            <span>0</span> / {allTopicsCount}
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('topics')}</span>
        </div>
      </Grid>
    </Grid>
  )
}

export default HomeStatistic
