import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PiStarFill } from 'react-icons/pi';
import { PiWarningFill } from 'react-icons/pi';
import { PiBookBookmarkFill } from 'react-icons/pi';
import { PiClockCountdownFill } from 'react-icons/pi';
import { FavoriteStore } from '../../services/FavoriteStore';
import Button from '../../components/Button/Button';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent='center'>
        <div className='home-page-container'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button blue largeFont>
                  {t('tickets')}
                  <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button red largeFont>
                  {t('exam')}
                  <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiBookBookmarkFill size={22} /> {t('topics')}
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiClockCountdownFill size={22} />
                  {t('marathon')} <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiWarningFill size={22} />
                  {t('errors')} <div>{t('inDevelop')}</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/favorite'>
                <Button counter={FavoriteStore.getFavorites().length}>
                  <PiStarFill size={22} />
                  {t('favorite')}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default Home;
