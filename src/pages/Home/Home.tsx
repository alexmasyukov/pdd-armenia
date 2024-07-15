import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { PiStarFill, PiWarningFill, PiBookBookmarkFill } from 'react-icons/pi';
// import { PiClockCountdownFill } from 'react-icons/pi';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FavoriteStore } from '../../services/FavoriteStore';
import Button from '../../components/Button/Button';
import HomeStatistic from '../../components/HomeStatistic/HomeStatistic';
import { routes } from '../../router/constants';
import CleanAllStatistics from '../../components/CleanButtons/CleanAllStatistics';
import CleanFavorites from '../../components/CleanButtons/CleanFavorites';
import { useCleaned } from '../../hooks/useCleaned';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import SettingsPanel from '../../components/SettingsPanel/SettingPanel';
import HomePlaceholder from '../../placeholders/HomePlaceholder';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useAppState();
  const navigate = useNavigate();
  const { onCleaned } = useCleaned();

  if (content.loading) {
    return <HomePlaceholder />;
  }

  return (
    <>
      <Grid container>
        <div className='home-page-container'>
          <Paper
            onClick={() => navigate(routes.topics.path, { replace: true })}
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
            <HomeStatistic />
          </Paper>
          <Grid container spacing={1}>
            {/* <Grid item xs={6}>
              <Link to={''}>
                <Button blue largeFont>
                  {t('tickets')}
                  <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid> */}

            <Grid item xs={6}>
              <Link to={routes.detailedTopics.path}>
                <Button red>
                  {/*<PiBookBookmarkFill size={22} /> */}
                  Темы
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={routes.topics.path}>
                <Button>
                  <PiBookBookmarkFill size={22} /> Стандартные темы
                  {/*{t('topics')}*/}
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
            {/* <Grid item xs={6}>
              <Link to=''>
                <Button>
                  <PiClockCountdownFill size={22} />
                  {t('marathon')} <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid> */}
            <Grid item xs={6}>
              <Link to={routes.errors.path}>
                <Button>
                  <PiWarningFill size={22} />
                  {t('errors')}
                </Button>
              </Link>
            </Grid>
            {/*<Grid item xs={6}>*/}
            {/*  <Link to={''}>*/}
            {/*    <Button red largeFont>*/}
            {/*      {t('exam')}*/}
            {/*      <div>{t('inDevelop')}</div>*/}
            {/*    </Button>*/}
            {/*  </Link>*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
              <SettingsPanel />
            </Grid>
          </Grid>

          <Grid container mt={3} spacing={0.5}>
            <Grid item xs={12}>
              <CleanAllStatistics onCleaned={onCleaned} />
            </Grid>
            <Grid item xs={12}>
              <CleanFavorites onCleaned={onCleaned} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default Home;
