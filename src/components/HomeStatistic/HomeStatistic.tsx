import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Progress from '../Progress/Progress';
import s from './HomeStatistic.module.scss';

const HomeStatistic: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={4} display='flex' justifyContent={'flex-start'}>
        <div className={s.item}>
          <span>
            <span>5</span> / 1000
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('questions')}</span>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={s.item}>
          <span>
            <span>0</span> / 40
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('tickets')}</span>
        </div>
      </Grid>
      <Grid item xs={4} display='flex' justifyContent={'flex-end'}>
        <div className={s.item}>
          <span>
            <span>0</span> / 27
          </span>
          <Progress className={s.bar} max={100} value={0} />
          <span>{t('topics')}</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default HomeStatistic;
