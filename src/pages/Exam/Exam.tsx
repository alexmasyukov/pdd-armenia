import React, { useCallback, useState } from 'react'
import { PiListNumbersBold, PiTimerBold, PiWarningCircleBold } from 'react-icons/pi'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { AnswerKey, Question as QuestionType } from '../../types'
import { getExamQuestions } from './helpers'
import ExamProcess from './ExamProcess'
import ExamResult from './ExamResult'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import s from './Exam.module.scss'

type ExamState =
  | { phase: 'idle' }
  | { phase: 'inProgress'; questions: QuestionType[] }
  | { phase: 'finished'; questions: QuestionType[]; answers: Map<number, AnswerKey>; timeSpent: number }

const Exam: React.FC = () => {
  const { content } = useAppState()
  const [state, setState] = useState<ExamState>({ phase: 'idle' })

  const handleStart = () => {
    const questions = getExamQuestions(content.questions)
    setState({ phase: 'inProgress', questions })
  }

  const handleFinish = useCallback((answers: Map<number, AnswerKey>, timeSpent: number) => {
    setState((prev) => {
      if (prev.phase !== 'inProgress') return prev
      return { phase: 'finished', questions: prev.questions, answers, timeSpent }
    })
  }, [])

  const handleRetry = () => {
    setState((prev) => {
      if (prev.phase !== 'finished') return prev
      return { phase: 'inProgress', questions: prev.questions }
    })
  }

  const handleCancel = () => {
    setState({ phase: 'idle' })
  }

  if (content.loading) return <TopicPlaceholder />

  if (state.phase === 'inProgress') {
    return <ExamProcess questions={state.questions} onFinish={handleFinish} onCancel={handleCancel} />
  }

  if (state.phase === 'finished') {
    return <ExamResult questions={state.questions} answers={state.answers} timeSpent={state.timeSpent} onRetry={handleRetry} />
  }

  return (
    <div className={s['start-screen']}>
      <div className={s.card}>
        <div className={s['card-header']}>
          <h2>Экзамен ПДД</h2>
        </div>

        <ul className={s.rules}>
          <li>
            <PiListNumbersBold size={20} className={s['rule-icon']} />
            <span>20 вопросов — по 2 из каждой категории</span>
          </li>
          <li>
            <PiTimerBold size={20} className={s['rule-icon']} />
            <span>30 минут на выполнение</span>
          </li>
          <li>
            <PiWarningCircleBold size={20} className={s['rule-icon']} />
            <span>Допускается не более 2 ошибок</span>
          </li>
        </ul>

        <button className={s['start-btn']} onClick={handleStart}>
          Начать экзамен
        </button>
      </div>
    </div>
  )
}

export default Exam
