import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { PiStarFill } from 'react-icons/pi';
import { PiWarningFill } from 'react-icons/pi';
import { PiBookBookmarkFill } from 'react-icons/pi';
import { PiClockCountdownFill } from 'react-icons/pi';
import { FavoriteStore } from '../../services/FavoriteStore';
import Button from '../../components/Button/Button';

const Home: React.FC = () => {
  return (
    <>
      <Grid container justifyContent='center'>
        <div className='home-page-container'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button blue largeFont>
                  Билеты
                  <div>В разработке</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button red largeFont>
                  Экзамен
                  <div>В разработке</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiBookBookmarkFill size={22} /> Темы
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiClockCountdownFill size={22} />
                  Марафон <div>В разработке</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/groups'>
                <Button>
                  <PiWarningFill size={22} />
                  Ошибки <div>В разработке</div>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to='/favorite'>
                <Button counter={FavoriteStore.getFavorites().length}>
                  <PiStarFill size={22} />
                  Избранное
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
