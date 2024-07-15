import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Progress from '../../components/Progress/Progress';
import { routes } from '../../router/constants';
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics';
import { useCleaned } from '../../hooks/useCleaned';
import TopicsPlaceholder from '../../placeholders/TopicsPlaceholder';
import { pluralize } from '../../helpers/text';
import s from './../Topics/Topics.module.scss';
import { useFirebase } from '../../contexts/FirebaseContext';
import { Group } from '../../components/Firebase/types';

const DetailedTopics: React.FC = () => {
  const { t } = useTranslation();
  const { onCleaned } = useCleaned();
  const { fetchGroups } = useFirebase();

  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    };

    setLoading(true);
    getGroups().finally(() => setLoading(false));
  }, [fetchGroups]);

  if (loading) {
    return <TopicsPlaceholder />;
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
        {groups.map((group, index) => {
          return (
            <React.Fragment key={group.id}>
              <Grid container spacing={1} mb={2} mt={index === 0 ? 2 : 0} className={s.topic}>
                <Grid item xs={7} sm={9} md={10}>
                  <Link to={routes.detailedTopics.topicById.view(group.id)}>{group.name}</Link>
                  <div className='questions-count'>
                    {group.questionIds.length}{' '}
                    {pluralize(group.questionIds.length, 'вопрос', 'вопроса', 'вопросов')}
                  </div>
                </Grid>
                <Grid item xs={5} sm={3} md={2} textAlign={'right'}>
                  <div className={s.count}>
                    <div></div>
                    <div></div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Progress variant='secondary' max={group.questionIds.length} value={0} secondValue={0} />
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
          );
        })}

        <Grid container mb={1} justifyContent='flex-end'>
          <CleanAllStatistics onCleaned={onCleaned} />
        </Grid>
      </Container>
    </>
  );
};

export default DetailedTopics;
