import React, { useEffect, useRef, useState } from 'react'
import { PiCaretLeftBold, PiTimerBold, PiFlagCheckeredBold } from 'react-icons/pi'
import clsx from 'clsx'
import AnswerHistory from '../../components/AnswerHistory/AnswerHistory'
import { AnswerKey, Question as QuestionType } from '../../types'
import { QuestionStatus } from '../../enums'
import s from './Exam.module.scss'
import qs from '../../components/Question/Question.module.scss'

const EXAM_TIME = 30 * 60 // 30 минут в секундах

interface Props {
  questions: QuestionType[]
  onFinish: (answers: Map<number, AnswerKey>, timeSpent: number) => void
  onCancel: () => void
}

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

const ExamProcess: React.FC<Props> = ({ questions, onFinish, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<number, AnswerKey>>(new Map())
  const answersRef = useRef(answers)
  answersRef.current = answers
  const timeLeftRef = useRef(timeLeft)
  timeLeftRef.current = timeLeft

  const answeredCount = answers.size
  const totalQuestions = questions.length
  const currentQuestion = questions[questionIndex]
  const currentAnswer = answers.get(currentQuestion.id)

  // Таймер
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Время вышло
  useEffect(() => {
    if (timeLeft === 0) {
      onFinish(answersRef.current, EXAM_TIME - timeLeftRef.current)
    }
  }, [timeLeft, onFinish])

  // Все вопросы отвечены
  useEffect(() => {
    if (answeredCount === totalQuestions) {
      onFinish(answersRef.current, EXAM_TIME - timeLeftRef.current)
    }
  }, [answeredCount, totalQuestions, onFinish])

  const handleAnswerClick = (answerKey: AnswerKey) => () => {
    if (currentAnswer) return

    const newAnswers = new Map(answers)
    newAnswers.set(currentQuestion.id, answerKey)
    setAnswers(newAnswers)

    // Переход к следующему вопросу
    if (questionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setQuestionIndex((prev) => prev + 1)
      }, 200)
    }
  }

  const handleSelectQuestion = (index: number) => () => {
    setQuestionIndex(index)
  }

  const answerHistory = questions.map((q, index) => ({
    questionIndex: index,
    status: answers.has(q.id) ? QuestionStatus.Answered : QuestionStatus.NotAnswered,
    answer: answers.get(q.id) || '',
  }))

  const { q, a1, a2, a3, a4, a5, a6, img, gid } = currentQuestion
  const answerOptions = [
    { key: 'a1', value: a1 },
    { key: 'a2', value: a2 },
    { key: 'a3', value: a3 },
    { key: 'a4', value: a4 },
    { key: 'a5', value: a5 },
    { key: 'a6', value: a6 },
  ].filter((a) => !!a.value)

  return (
    <>
      <div className='statistic'>
        <div className='btn-prev-page' onClick={onCancel}>
          <PiCaretLeftBold /> Экзамен
        </div>
      </div>

      <AnswerHistory
        answerHistory={answerHistory}
        activeQuestionIndex={questionIndex}
        onSelectQuestion={handleSelectQuestion}
      />
      <div className='line' />

      <div className={s['question-container']}>
        <div className={qs.question}>
          {img && <img src={`${process.env.PUBLIC_URL}/images/questions/${gid}/${img}.webp`} alt='' />}
          {!img && (
            <div className={qs.withoutImg}>
              Вопрос без изображения
              <div />
            </div>
          )}
          <p>{q}</p>

          <ul className={qs.answers}>
            {answerOptions.map((a) => (
              <li key={a.key} onClick={handleAnswerClick(a.key)}>
                {a.value}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.bottom}>
          <button className={s['finish-btn']} onClick={() => onFinish(answers, EXAM_TIME - timeLeft)}>
            <PiFlagCheckeredBold size={16} /> Завершить ({answeredCount}/{totalQuestions})
          </button>
          <div className={clsx(s.timer, { [s.warning]: timeLeft < 60 })}>
            <PiTimerBold size={20} /> {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    </>
  )
}

export default ExamProcess
