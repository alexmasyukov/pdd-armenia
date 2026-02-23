import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { AnswerKey, Question as QuestionType } from '../../types'
import { routes } from '../../router/constants'
import { pluralize } from '../../helpers/text'
import Question from '../../components/Question/Question'
import s from './Exam.module.scss'

const MAX_ERRORS = 2
const noop = () => {}

interface Props {
  questions: QuestionType[]
  answers: Map<number, AnswerKey>
  onRetry: () => void
}

const ExamResult: React.FC<Props> = ({ questions, answers, onRetry }) => {
  const navigate = useNavigate()

  const errorQuestions = questions.filter((q) => {
    const userAnswer = answers.get(q.id)
    return !userAnswer || userAnswer !== q.correct
  })

  const errorsCount = errorQuestions.length
  const passed = errorsCount <= MAX_ERRORS

  return (
    <>
      <div className={clsx(s['result-banner'], passed ? s.passed : s.failed)}>
        <h2>{passed ? 'Поздравляем! Экзамен сдан!' : 'Экзамен не сдан'}</h2>
        <p>
          {errorsCount === 0
            ? 'Без ошибок!'
            : `${errorsCount} ${pluralize(errorsCount, 'ошибка', 'ошибки', 'ошибок')} из ${questions.length} вопросов`}
        </p>
      </div>

      <div className={s['result-actions']}>
        <button className={s['retry-btn']} onClick={onRetry}>
          Пройти снова
        </button>
        <button className={s['home-btn']} onClick={() => navigate(routes.home.path)}>
          На главную
        </button>
      </div>

      {errorQuestions.length > 0 && (
        <div className={s['error-questions']}>
          <h3>Вопросы с ошибками:</h3>
          {errorQuestions.map((question) => {
            const examNumber = questions.indexOf(question) + 1
            return (
              <div key={question.id} className={s['error-question-card']}>
                <div className={s['error-question-number']}>Вопрос {examNumber}.</div>
                <Question
                  item={question}
                  enabled={false}
                  answerFromHistory={answers.get(question.id) || ''}
                  onAnswer={noop}
                  showRightAnswer
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ExamResult
