import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { routes } from '../../router/constants';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();

  const header = <Header />;

  const base = (
    <main>
      {children}
      <Outlet />
    </main>
  );

  if (pathname === '/') {
    return (
      <Container>
        <Grid container justifyContent='center'>
          <div className='home-page-container'>
            {header}
            {base}
          </div>
        </Grid>
      </Container>
    );
  }

  if (pathname === routes.topics.path) {
    return (
      <>
        <Container>{header}</Container>
        {base}
      </>
    );
  }

  return (
    <Container>
      {header}
      {base}
    </Container>
  );
};

export default Layout;
