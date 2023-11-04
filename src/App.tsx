import React, { Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import Page404 from './pages/404/404';
import HomeSkeleton from './components/Skeleton/HomeSkeleton';
import Favorite from './pages/Fovorite/Fovorite';

// lazy load Home page
const Home = React.lazy(() => import('./pages/Home/Home'));
const Groups = React.lazy(() => import('./pages/Groups/Groups'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='groups'
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Groups />
            </Suspense>
          }
        />
        <Route
          path='favorite'
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Favorite />
            </Suspense>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
