import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './../layouts/Layout/Layout'
import Page404 from './../pages/404/404'
import HomePlaceholder from '../placeholders/HomePlaceholder'
import TopicsPlaceholder from '../placeholders/TopicsPlaceholder'
import TopicPlaceholder from '../placeholders/TopicPlaceholder'
import { routes } from './constants'

const Home = React.lazy(() => import('./../pages/Home/Home'))
const DetailedTopics = React.lazy(() => import('./../pages/DetailedTopics/DetailedTopics'))
const DetailedTopic = React.lazy(() => import('./../pages/DetailedTopics/DetailedTopic'))
const Topics = React.lazy(() => import('./../pages/Topics/Topics'))
const Topic = React.lazy(() => import('./../pages/Topics/Topic'))
const TopicErrors = React.lazy(() => import('./../pages/TopicErrors/TopicErrors'))
const CheckQuestions = React.lazy(() => import('../pages/CheckQuestions/CheckQuestions'))
const Errors = React.lazy(() => import('./../pages/Errors/Errors'))
const Favorite = React.lazy(() => import('./../pages/Favorite/Favorite'))

const Router = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<HomePlaceholder />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path={routes.detailedTopics.path}
          element={
            <Suspense fallback={<TopicsPlaceholder />}>
              <DetailedTopics />
            </Suspense>
          }
        />
        <Route
          path={routes.detailedTopics.topicById.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <DetailedTopic />
            </Suspense>
          }
        />

        <Route
          path={routes.topics.path}
          element={
            <Suspense fallback={<TopicsPlaceholder />}>
              <Topics />
            </Suspense>
          }
        />
        <Route
          path={routes.topics.topicById.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <Topic />
            </Suspense>
          }
        />

        <Route
          path={routes.favorite.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <Favorite />
            </Suspense>
          }
        />

        <Route
          path={routes.favorite.favoritesByTopicId.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <Favorite />
            </Suspense>
          }
        />

        <Route
          path={routes.topicErrors.errorsByTopicId.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <TopicErrors />
            </Suspense>
          }
        />

        <Route
          path={routes.checkQuestions.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <CheckQuestions />
            </Suspense>
          }
        />

        <Route
          path={routes.errors.path}
          element={
            <Suspense fallback={<TopicPlaceholder />}>
              <Errors />
            </Suspense>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default Router
