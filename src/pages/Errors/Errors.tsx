import React from 'react'
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { getQuestionsHasErrors } from './helpers'

const Errors: React.FC = () => {
  const { content } = useAppState()

  if (content.loading) {
    return <TopicPlaceholder />
  }

  const questions = getQuestionsHasErrors(content.questions)

  return (
    <>
      {content.questions.length > 0 ? (
        <FavoriteQuestions
          questions={questions}
          title={'Ошибки'}
          prevLink={routes.home.path}
          questionProgress={true}
        />
      ) : (
        <p>Нет вопросов с неверными ответами</p>
      )}
    </>
  )
}

export default Errors
