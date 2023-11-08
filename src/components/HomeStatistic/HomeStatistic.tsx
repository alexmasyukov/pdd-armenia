import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Progress from '../Progress/Progress';
import s from './HomeStatistic.module.scss';
import { StatisticsStore } from '../../services/StatisticsStore';
import { Language } from '../../enums';

type Props = {
  questions: number;
  topics: number;
  tickets: number;
};

const HomeStatistic: React.FC<Props> = ({ questions = 0, topics = 0, tickets = 0 }) => {
  const { t, i18n } = useTranslation();
  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(i18n.language as Language);
  const questionsCount = Object.keys(questionsStatistics).length;

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={4} display='flex' justifyContent={'flex-start'}>
        <div className={s.item}>
          <span>
            <span>{questionsCount}</span> / {questions}
          </span>
          <Progress className={s.bar} max={questions} value={questionsCount} />
          <span>{t('questions')}</span>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.item}>
          <span>
            <span>0</span> / {tickets}
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('tickets')}</span>
        </div>
      </Grid>
      <Grid item xs={4} display='flex' justifyContent={'flex-end'}>
        <div className={s.item}>
          <span>
            <span>0</span> / {topics}
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('topics')}</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default HomeStatistic;
