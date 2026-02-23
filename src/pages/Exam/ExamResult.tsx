import React from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import clsx from 'clsx'
import { AnswerKey, Question as QuestionType } from '../../types'
import { routes } from '../../router/constants'
import { pluralize } from '../../helpers/text'
import s from './Exam.module.scss'

const MAX_ERRORS = 2

interface Props {
  questions: QuestionType[]
  answers: Map<number, AnswerKey>
  onRetry: () => void
}

interface ErrorQuestion {
  question: QuestionType
  userAnswer: AnswerKey | undefined
}

const ExamResult: React.FC<Props> = ({ questions, answers, onRetry }) => {
  const navigate = useNavigate()

  const errorQuestions: ErrorQuestion[] = questions
    .filter((q) => {
      const userAnswer = answers.get(q.id)
      return !userAnswer || userAnswer !== q.correct
    })
    .map((q) => ({ question: q, userAnswer: answers.get(q.id) }))

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
          <Grid container spacing={2}>
            {errorQuestions.map(({ question, userAnswer }) => {
              const answerOptions = [
                { key: 'a1', value: question.a1 },
                { key: 'a2', value: question.a2 },
                { key: 'a3', value: question.a3 },
                { key: 'a4', value: question.a4 },
                { key: 'a5', value: question.a5 },
                { key: 'a6', value: question.a6 },
              ].filter((a) => !!a.value)

              return (
                <Grid item xs={12} md={6} key={question.id}>
                  <div className={s['error-question-card']}>
                    {question.img && (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/questions/${question.gid}/${question.img}.jpg`}
                        alt=''
                      />
                    )}
                    <div className={s['question-text']}>{question.q}</div>
                    <ul className={s['answer-list']}>
                      {answerOptions.map((a) => (
                        <li
                          key={a.key}
                          className={clsx({
                            [s.correct]: a.key === question.correct,
                            [s.wrong]: a.key === userAnswer && a.key !== question.correct,
                          })}
                        >
                          {a.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        </div>
      )}
    </>
  )
}

export default ExamResult
