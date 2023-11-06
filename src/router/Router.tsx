import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './../layouts/Layout/Layout';
import Page404 from './../pages/404/404';
import Favorite from './../pages/Fovorite/Fovorite';
import HomeSkeleton from './../components/Skeleton/HomeSkeleton';
import { routes } from './constants';

const Home = React.lazy(() => import('./../pages/Home/Home'));
const Topics = React.lazy(() => import('./../pages/Topics/Topics'));
const Topic = React.lazy(() => import('./../pages/Topics/Topic'));
const Errors = React.lazy(() => import('./../pages/Errors/Errors'));

const Router = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={routes.topics.path}
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Topics />
            </Suspense>
          }
        />
        <Route
          path={routes.topics.topicById.path}
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Topic />
            </Suspense>
          }
        />
        <Route
          path={routes.favorite.path}
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Favorite />
            </Suspense>
          }
        />
        <Route
          path={routes.errors.path}
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Errors />
            </Suspense>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default Router;
