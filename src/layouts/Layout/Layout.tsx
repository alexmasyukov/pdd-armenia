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
      <div
        style={{
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {`<`} Назад
      </div>
      <main>
        {children}
        <Outlet />
      </main>
      <Header />
      <footer>{/* Footer content */}</footer>
    </Container>
  );
};

export default Layout;
