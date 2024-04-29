import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Progress from '../../components/Progress/Progress';
import { getStatisticsByGroup } from '../../helpers';
import { routes } from '../../router/constants';
import { Language } from '../../enums';
import { StatisticsStore } from '../../services/StatisticsStore';
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics';
import { useCleaned } from '../../hooks/useCleaned';
import InFavoriteLink from '../../components/InFavoriteLink/InFavoriteLink';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import s from './Topics.module.scss';

const Topics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { onCleaned } = useCleaned();
  const { content } = useAppState();

  const questionsStatistics = StatisticsStore.getAllQuestionsStatistics(i18n.language as Language);

  // TODO: add loading placeholder
  if (content.loading) {
    return <>loading</>;
  }

  return (
    <>
      <Grid container className={s.topicsTitle}>
        <Grid item xs={9} sm={10} md={9}>
          {t('topic')}
        </Grid>
        <Grid item xs={3} sm={2} md={3} textAlign={'right'}>
          <div className={s.count}>
            <div>{t('inFavorite')}</div>
            <div>{t('solved')}</div>
            <div>{t('total')}</div>
          </div>
        </Grid>
      </Grid>
      {content.groups.map((group, index) => {
        const statistics = getStatisticsByGroup(group.id, questionsStatistics, {
          groups: content.groups,
          questions: content.questions,
        });

        return (
          <React.Fragment key={group.id}>
            <Grid container spacing={1} mb={2} mt={index === 0 ? 2 : 0} className={s.topic}>
              <Grid item xs={9} sm={10} md={9}>
                <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
              </Grid>
              <Grid item xs={3} sm={2} md={3} textAlign={'right'}>
                <div className={s.count}>
                  <div>
                    {statistics.inFavotite ? (
                      <InFavoriteLink count={statistics.inFavotite} topicId={group.id} />
                    ) : (
                      <></>
                    )}
                  </div>
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
              {index !== content.groups.length - 1 && (
                <Grid item xs={12}>
                  <div className={s.hr} />
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        );
      })}

      <Grid container mb={1} justifyContent='flex-end'>
        <CleanAllStatistics onCleaned={onCleaned} />
      </Grid>
    </>
  );
};

export default Topics;
