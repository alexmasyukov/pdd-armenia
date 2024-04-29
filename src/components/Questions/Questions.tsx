import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PiCaretLeftBold } from 'react-icons/pi';
import Question from '../Question/Question';
import { AnswerEvent, AnswerHistory as AnswerHistoryType, Question as QuestionType } from '../../types';
import AnswerHistory from '../AnswerHistory/AnswerHistory';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Percent from '../Percent/Percent';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import { StatisticsStore } from '../../services/StatisticsStore';
import { QuestionStatus, Language } from '../../enums';
import ShowRightAnswersBtn from '../ShowRightAnswersBtn/ShowRightAnswersBtn';
import ReportBtn from '../ReportBtn/ReportBtn';
import s from './Questions.module.scss';

interface Props {
  questions: QuestionType[];
  favoriteAddButton?: boolean;
  title?: string;
  prevLink?: string;
}

const setEmptyAnswerHistory = (questions: QuestionType[]) => {
  return questions.map((_, index) => ({
    questionIndex: index,
    status: QuestionStatus.NotAnswered,
    answer: '',
  }));
};

const saveToStorage = (questionId: QuestionType['id'], answerIsCorrect: boolean, lang: Language) => {
  StatisticsStore.setQuestionStatistics(questionId, lang, answerIsCorrect);
};

const Questions: React.FC<Props> = ({ questions = [], favoriteAddButton = true, title, prevLink }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { showRightAnswers } = useAppState();
  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryType>(setEmptyAnswerHistory(questions));
  const [questionIndex, setQuestionIndex] = useState(0);

  const maxIndex = questions.length - 1;
  const currentQuestion = questions[questionIndex];
  const answerFromHistory = answerHistory[questionIndex];
  const isLastQuestion = questionIndex === maxIndex;

  // useEffect questions change
  useEffect(() => {
    setAnswerHistory(setEmptyAnswerHistory(questions));
    setQuestionIndex(0);
  }, [questions]);

  const hanldeNextQuestionClick = () => {
    if (!isLastQuestion) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSelectQuestionClick = (index: number) => () => {
    setQuestionIndex(index);
  };

  const handlePrevLinkClick = () => {
    if (prevLink) {
      navigate(prevLink, { replace: true });
    }
  };

  const handleAnswer = ({ answer, answerIsCorrect }: AnswerEvent) => {
    saveToStorage(currentQuestion.id, answerIsCorrect, i18n.language as Language);

    setAnswerHistory((prev) => {
      const newHistory = [...prev];
      newHistory[questionIndex] = {
        questionIndex,
        status: answerIsCorrect ? QuestionStatus.Correct : QuestionStatus.Wrong,
        answer,
      };
      return newHistory;
    });

    if (answerIsCorrect) {
      // auto move to next question
      setTimeout(() => {
        hanldeNextQuestionClick();
      }, 200);
    }
  };

  if (!currentQuestion || !answerFromHistory) {
    return null;
  }

  return (
    <>
      <div className='statistic'>
        <div className='btn-prev-page' onClick={handlePrevLinkClick}>
          <PiCaretLeftBold /> {title}
        </div>
        <Percent answerHistory={answerHistory} />
      </div>

      <AnswerHistory
        answerHistory={answerHistory}
        activeQuestionIndex={questionIndex}
        onSelectQuestion={handleSelectQuestionClick}
      />

      <div className={s['question-container']}>
        <Question
          item={currentQuestion}
          answerFromHistory={answerFromHistory.answer}
          enabled={answerFromHistory.status === QuestionStatus.NotAnswered}
          onAnswer={handleAnswer}
          showRightAnswer={showRightAnswers}
        />

        <div className={s['question-container']}>
          <div className={s.buttons}>
            <div>
              <FavoriteButton questionId={currentQuestion.id} addButton={favoriteAddButton} />

              <ShowRightAnswersBtn />

              <ReportBtn questionId={currentQuestion.id} group={title} />
            </div>

            {answerFromHistory.status === QuestionStatus.Wrong && !isLastQuestion && (
              <button className={s['next-question-btn']} onClick={hanldeNextQuestionClick}>
                {t('nextQuestion')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
