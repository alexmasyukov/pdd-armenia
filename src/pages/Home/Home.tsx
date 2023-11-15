import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { PiStarFill } from 'react-icons/pi';
import { PiWarningFill } from 'react-icons/pi';
import { PiBookBookmarkFill } from 'react-icons/pi';
import { PiClockCountdownFill } from 'react-icons/pi';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FavoriteStore } from '../../services/FavoriteStore';
import Button from '../../components/Button/Button';
import HomeStatistic from '../../components/HomeStatistic/HomeStatistic';
import { routes } from '../../router/constants';
import { BaseData } from '../../types';
import { getEmptyBaseData } from '../../helpers';
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics';
import CleanFavorites from '../../components/CleanButtons/CleanFavorites';
import { useCleaned } from '../../hooks/s';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const { onCleaned } = useCleaned();
  const tickets = 40;
  const questions = data.questions.length;
  const topics = data.groups.length;

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setData(data as BaseData);
    });
  }, []);

  return (
    <>
      <Grid container justifyContent='center'>
        <div className='home-page-container'>
          <Paper
            onClick={() => navigate(routes.topics.path)}
            sx={{
              padding: '25px',
              pt: 2,
              pb: 2,
              mt: 2,
              mb: 3,
              borderRadius: '6px',
              boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.06)',
              cursor: 'pointer',
            }}
          >
            <HomeStatistic questions={questions} topics={topics} tickets={tickets} />
          </Paper>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link to={''}>
                <Button blue largeFont>
                  {t('tickets')}
                  <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={''}>
                <Button red largeFont>
                  {t('exam')}
                  <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={routes.topics.path}>
                <Button>
                  <PiBookBookmarkFill size={22} /> {t('topics')}
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to=''>
                <Button>
                  <PiClockCountdownFill size={22} />
                  {t('marathon')} <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={routes.errors.path}>
                <Button>
                  <PiWarningFill size={22} />
                  {t('errors')}
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={routes.favorite.path}>
                <Button counter={FavoriteStore.getFavorites().length}>
                  <PiStarFill size={22} />
                  {t('favorite')}
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid container mt={3}>
            <Grid item xs={12}>
              <CleanAllStatistics onCleaned={onCleaned} />
              <CleanFavorites onCleaned={onCleaned} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default Home;
