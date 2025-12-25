import React, { useEffect, useState } from 'react'
import { FavoriteStore } from '../../services/FavoriteStore'
import { Question } from '../../types'
import Questions from '../Questions/Questions'

interface Props {
  questions: Question[]
  title?: string
  prevLink?: string
  questionProgress?: boolean
}

const getFavotiteQuestions = (questions: Question[]) => {
  const favoriteQuestionIds = FavoriteStore.getFavorites()
  return questions.filter((question) => favoriteQuestionIds.includes(question.id))
}

const FavoriteQuestions: React.FC<Props> = ({
  questions,
  title = '',
  prevLink = '',
  questionProgress = false,
}) => {
  const [favoriteQuestions, setFavoriteQuestions] = useState(questions)

  useEffect(() => {
    const onStorageEvent = () => {
      setFavoriteQuestions(getFavotiteQuestions(questions))
    }

    window.addEventListener('storage', onStorageEvent, false)

    return () => {
      window.removeEventListener('storage', onStorageEvent, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!favoriteQuestions.length) {
    return <p>В избранном нет вопросов</p>
  }

  return (
    <Questions
      questions={favoriteQuestions}
      favoriteAddButton={false}
      title={title}
      prevLink={prevLink}
      questionProgress={questionProgress}
    />
  )
}

export default FavoriteQuestions
