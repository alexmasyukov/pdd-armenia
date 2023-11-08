import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Progress from '../../components/Progress/Progress';
import { getEmptyBaseData, getStatisticsByGroup } from '../../helpers';
import { routes } from '../../router/constants';
import { BaseData, Group } from '../../types';
import s from './Topics.module.scss';
import { Language } from '../../enums';
import { StatisticsStore } from '../../services/StatisticsStore';

const Topics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const [loading, setLoading] = useState<boolean>(true);
  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(i18n.language as Language);

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setData(data as BaseData);
      setLoading(false);
    });
  }, []);

  const handleNavigateToTopic = (groupId: Group['id']) => () => {
    navigate(routes.topics.topicById.view(groupId));
  };

  return loading ? (
    <>Loaing</>
  ) : (
    <>
      <Grid container className={s.topicsTitle}>
        <Grid item xs={9} sm={10} md={11}>
          {t('topic')}
        </Grid>
        <Grid item xs={3} sm={2} md={1} textAlign={'right'}>
          <div className={s.count}>
            <div>{t('solved')}</div>
            <div>{t('total')}</div>
          </div>
        </Grid>
      </Grid>
      {data.groups.map((group, index) => {
        const statistics = getStatisticsByGroup(group.id, questionsStatistics, data);

        return (
          <React.Fragment key={group.id}>
            <Grid
              container
              spacing={1}
              mb={2}
              mt={index === 0 ? 2 : 0}
              onClick={handleNavigateToTopic(group.id)}
              className={s.topic}
            >
              <Grid item xs={9} sm={10} md={11}>
                <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
              </Grid>
              <Grid item xs={3} sm={2} md={1} textAlign={'right'}>
                <div className={s.count}>
                  <div>
                    <span>{statistics.correct}</span>
                    {' '}/{' '}
                    <span>{statistics.wrong}</span>
                  </div>
                  <div>{statistics.questionsCount}</div>
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
              {index !== data.groups.length - 1 && (
                <Grid item xs={12}>
                  <div className={s.hr} />
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Topics;
