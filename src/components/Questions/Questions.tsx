import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PiCaretLeftBold } from 'react-icons/pi'
// import clsx from 'clsx'
import Question from '../Question/Question'
import { AnswerEvent, AnswerHistory as AnswerHistoryType, Question as QuestionType } from '../../types'
import AnswerHistory from '../AnswerHistory/AnswerHistory'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import Percent from '../Percent/Percent'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language, QuestionStatus } from '../../enums'
import ShowRightAnswersBtn from '../ShowRightAnswersBtn/ShowRightAnswersBtn'
import ReportBtn from '../ReportBtn/ReportBtn'
import ShowRightAnswerBtn from './components/ShowRightAnswerBtn'
// import Help from '../Help/Help'
// import HelpBtn from '../Help/HelpBtn'
import s from './Questions.module.scss'
import Grid from '@mui/material/Grid'
import AddQuestion from '../Firebase/AddQuestion'
import QuestionCheckStatus from '../QuestionCheckStatus/QuestionCheckStatus'
import QuestionStatisticProgress from './components/QuestionStatisticProgress'

interface Props {
  questions: QuestionType[]
  favoriteAddButton?: boolean
  title?: string
  prevLink?: string
  questionProgress?: boolean
}

const setEmptyAnswerHistory = (questions: QuestionType[]) => {
  return questions.map((_, index) => ({
    questionIndex: index,
    status: QuestionStatus.NotAnswered,
    answer: '',
  }))
}

const saveToStorage = (questionId: QuestionType['id'], answerIsCorrect: boolean, lang: Language) => {
  StatisticsStore.setQuestionStatistics(questionId, lang, answerIsCorrect)
}

const Questions: React.FC<Props> = ({
  questions = [],
  favoriteAddButton = true,
  title,
  prevLink,
  questionProgress = false,
}) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { showRightAnswers, isLocalApp } = useAppState()
  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryType>(setEmptyAnswerHistory(questions))
  const [questionIndex, setQuestionIndex] = useState(0)
  const [hasNextQuestionBtn, setHasNextQuestionBtn] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const maxIndex = questions.length - 1
  const currentQuestion = questions[questionIndex]
  const answerFromHistory = answerHistory[questionIndex]
  const isLastQuestion = questionIndex === maxIndex

  // useEffect questions change
  useEffect(() => {
    setAnswerHistory(setEmptyAnswerHistory(questions))
    setQuestionIndex(0)
  }, [questions])

  useEffect(() => {
    setHasNextQuestionBtn(false)
    setShowHelp(false)
  }, [questionIndex])

  const hanldeNextQuestionClick = () => {
    if (!isLastQuestion) {
      setQuestionIndex((prev) => prev + 1)
    }
  }

  const handleSelectQuestionClick = (index: number) => () => {
    setQuestionIndex(index)
  }

  const handlePrevLinkClick = () => {
    if (prevLink) {
      navigate(prevLink)
    }
  }

  const handleAnswer = ({ answer, answerIsCorrect, autoNextQuestion = true }: AnswerEvent) => {
    saveToStorage(currentQuestion.id, answerIsCorrect, i18n.language as Language)

    setAnswerHistory((prev) => {
      const newHistory = [...prev]
      newHistory[questionIndex] = {
        questionIndex,
        status: answerIsCorrect ? QuestionStatus.Correct : QuestionStatus.Wrong,
        answer,
      }
      return newHistory
    })

    if (answerIsCorrect) {
      if (autoNextQuestion) {
        // auto move to next question
        setTimeout(() => {
          hanldeNextQuestionClick()
        }, 200)
      } else {
        setHasNextQuestionBtn(true)
      }
    }
  }

  const handleShowCorrectAnswerClick = () => {
    handleAnswer({
      answer: currentQuestion.correct,
      answerIsCorrect: true,
      autoNextQuestion: false,
    })
  }

  if (!currentQuestion || !answerFromHistory) {
    return null
  }

  const showShowCorrectAnswerBtn =
    !hasNextQuestionBtn && !showRightAnswers && answerFromHistory.status !== QuestionStatus.Wrong

  const showNextQuestionBtn =
    !isLastQuestion && (answerFromHistory.status === QuestionStatus.Wrong || hasNextQuestionBtn)

  return (
    <>
      <div className='statistic'>
        <div className='btn-prev-page' onClick={handlePrevLinkClick}>
          <PiCaretLeftBold /> {title}
        </div>
        <div className='questions-progress'>
          <Percent answerHistory={answerHistory} />
        </div>
      </div>

      <AnswerHistory
        answerHistory={answerHistory}
        activeQuestionIndex={questionIndex}
        onSelectQuestion={handleSelectQuestionClick}
      />
      <div className='line' />

      <Grid container spacing={2}>
        <Grid item md={6}>
          <div className={s['question-container']}>
            {questionProgress && (
              <div className='question-statistics-progress'>
                <QuestionStatisticProgress questionId={currentQuestion.id} />
              </div>
            )}

            <Question
              item={currentQuestion}
              answerFromHistory={answerFromHistory.answer}
              enabled={answerFromHistory.status === QuestionStatus.NotAnswered}
              onAnswer={handleAnswer}
              showRightAnswer={showRightAnswers}
            />

            {/*{isLocalApp && showHelp && (*/}
            {/*  <div className={clsx(s['question-container'], s['help-container'])}>*/}
            {/*    <Help questionId={currentQuestion.id} />*/}
            {/*  </div>*/}
            {/*)}*/}

            <div className={s['question-container']}>
              <div className={s.buttons}>
                <div>
                  <FavoriteButton questionId={currentQuestion.id} addButton={favoriteAddButton} />

                  <ShowRightAnswersBtn />

                  <ReportBtn questionId={currentQuestion.id} group={title} />
                </div>

                <div className={s.rightBtns}>
                  {showShowCorrectAnswerBtn && <ShowRightAnswerBtn onClick={handleShowCorrectAnswerClick} />}
                  {/*{isLocalApp && <HelpBtn onClick={() => setShowHelp(true)} />}*/}

                  {showNextQuestionBtn && (
                    <button className={s['next-question-btn']} onClick={hanldeNextQuestionClick}>
                      {t('nextQuestion')}
                    </button>
                  )}
                </div>
              </div>

              <QuestionCheckStatus questionId={currentQuestion.id} disabled />
            </div>
          </div>
        </Grid>
        {/*<Grid item md={6} mt={0}>*/}
        {/*  <AddQuestion questionId={currentQuestion.id} />*/}
        {/*</Grid>*/}
      </Grid>
    </>
  )
}

export default Questions
