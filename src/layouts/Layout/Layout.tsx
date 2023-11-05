import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const base = (
    <>
      <Header />
      <main>
        {children}
        <Outlet />
      </main>

      <footer>{/* Footer content */}</footer>
    </>
  );

  return (
    <>
      {pathname === '/' ? (
        <Container>
          <Grid container justifyContent='center'>
            <div className='home-page-container'>{base}</div>
          </Grid>
        </Container>
      ) : (
        <Container>{base}</Container>
      )}
    </>
  );
};

export default Layout;
