import React from 'react'
import { useParams } from 'react-router-dom'
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { getQuestionsWithErrors } from './helpers'
import groupsData from '../../data/groups-version-2.json'

type DetailedGroup = {
  id: string
  name: string
  order: number
  questionIds: string[]
}

const groups = groupsData as DetailedGroup[]

const TopicErrors: React.FC = () => {
  const { id: topicId } = useParams<'id'>()
  const { content } = useAppState()

  if (content.loading) {
    return <TopicPlaceholder />
  }

  if (!topicId) {
    return <p>Группа не найдена</p>
  }

  const group = groups.find((g) => g.id === topicId)

  if (!group) {
    return <p>Группа не найдена</p>
  }

  const questions = getQuestionsWithErrors(content.questions, group.questionIds)
  const title = `Ошибки по теме «${group.name}»`
  const prevLink = routes.detailedTopics.path

  return (
    <>
      {questions.length > 0 ? (
        <FavoriteQuestions questions={questions} title={title} prevLink={prevLink} />
      ) : (
        <p>Вопросов c неверными ответами не найдено</p>
      )}
    </>
  )
}

export default TopicErrors
