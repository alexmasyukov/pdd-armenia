import Grid from '@mui/material/Grid'
import Progress from '../Progress/Progress'
import { StatisticsStore } from '../../services/StatisticsStore'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { Language } from '../../enums'
import s from './HomeStatistic.module.scss'

const HomeStatistic = () => {
  const { content } = useAppState()

  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(Language.Russian)
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
          <span>Вопросы</span>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={s.item}>
          <span>
            <span>0</span> / {allTopicsCount}
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>Темы</span>
        </div>
      </Grid>
    </Grid>
  )
}

export default HomeStatistic
