import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiCheckCircleBold, PiXCircleBold, PiTimerBold, PiWarningBold, PiListNumbersBold } from 'react-icons/pi'
import clsx from 'clsx'
import { AnswerKey, Question as QuestionType } from '../../types'
import { routes } from '../../router/constants'
import { pluralize } from '../../helpers/text'
import Question from '../../components/Question/Question'
import s from './Exam.module.scss'

const MAX_ERRORS = 2
const noop = () => {}

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

interface Props {
  questions: QuestionType[]
  answers: Map<number, AnswerKey>
  timeSpent: number
  onRetry: () => void
}

const ExamResult: React.FC<Props> = ({ questions, answers, timeSpent, onRetry }) => {
  const navigate = useNavigate()

  const errorQuestions = questions.filter((q) => {
    const userAnswer = answers.get(q.id)
    return !userAnswer || userAnswer !== q.correct
  })

  const errorsCount = errorQuestions.length
  const passed = errorsCount <= MAX_ERRORS
  const correctCount = questions.length - errorsCount

  return (
    <>
      <div className={clsx(s['result-banner'], passed ? s.passed : s.failed)}>
        <div className={s['result-icon']}>
          {passed ? <PiCheckCircleBold size={40} /> : <PiXCircleBold size={40} />}
        </div>
        <h2>{passed ? 'Экзамен сдан!' : 'Экзамен не сдан'}</h2>

        <div className={s['result-stats']}>
          <div className={s['result-stat']}>
            <PiListNumbersBold size={16} />
            <span>{correctCount} из {questions.length} правильных</span>
          </div>
          <div className={s['result-stat']}>
            <PiWarningBold size={16} />
            <span>{errorsCount} {pluralize(errorsCount, 'ошибка', 'ошибки', 'ошибок')}</span>
          </div>
          <div className={s['result-stat']}>
            <PiTimerBold size={16} />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>
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
