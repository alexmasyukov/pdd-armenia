import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { Group, Question } from '../../types'
import { useFirebase } from '../../contexts/FirebaseContext'
import { getQuestionsWithErrors } from './helpers'

const TopicErrors: React.FC = () => {
  const { id: topicId } = useParams<'id'>()
  const { content } = useAppState()
  const { fetchGroup } = useFirebase()

  const [state, setState] = useState<{
    loading: boolean
    error: string | null
    questions: Question[]
    groupName: Group['name']
  }>({
    loading: true,
    error: null,
    questions: [],
    groupName: '',
  })

  useEffect(() => {
    if (!topicId || topicId.length < 10) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Группа не найдена',
      }))

      return
    }

    if (!content.loading && content.groups.length === 0 && content.questions.length === 0) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Ошибка при загрузке вопросов',
      }))
      return
    }

    if (content.loading) {
      return
    }

    const getGroup = async () => {
      const fetchedGroup = await fetchGroup(topicId)

      if (fetchedGroup && Array.isArray(fetchedGroup?.questionIds)) {
        setState({
          loading: false,
          error: null,
          questions: getQuestionsWithErrors(content.questions, fetchedGroup.questionIds),
          groupName: fetchedGroup.name,
        })
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Группа не найдена',
        }))
      }
    }
    getGroup()
  }, [content.loading, topicId, content, fetchGroup])

  const title = `Ошибки по теме «${state.groupName}»`
  const prevLink = routes.detailedTopics.path

  if (state.loading) {
    return <TopicPlaceholder />
  }

  if (state.error) {
    return <p>{state.error}</p>
  }

  return (
    <>
      {state.questions.length > 0 ? (
        <FavoriteQuestions questions={state.questions} title={title} prevLink={prevLink} />
      ) : (
        <p>Вопросов c неверными ответами не найдено</p>
      )}
    </>
  )
}

export default TopicErrors
