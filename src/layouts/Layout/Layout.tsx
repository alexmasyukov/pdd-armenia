import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />

      <main>
        {children}
        <Outlet />
      </main>

      <footer>{/* Footer content */}</footer>
    </Container>
  );
};

export default Layout;
