import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import { AnswerEvent, AnswerHistory as AnswerHistoryType, Question as QuestionType } from '../../types';
import { QuestionStatus } from '../../enums';
import AnswerHistory from '../AnswerHistory/AnswerHistory';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Percent from '../Percent/Percent';
import { PiCaretLeftBold, PiWarningLight } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

interface Props {
  questions: QuestionType[];
  favoriteAddButton?: boolean;
}

const setEmptyAnswerHistory = (questions: QuestionType[]) => {
  return questions.map((_, index) => ({
    questionIndex: index,
    status: QuestionStatus.NotAnswered,
    answer: '',
  }));
};

const saveToStorage = () => {
  const start = performance.now();
  const count = 1000;

  // Setup data
  const data = {};

  // Create data array
  for (var i = 0; i < count; i++) {
    // @ts-ignore
    data[i] = [20, 30];
  }

  localStorage.setItem('answerHistory', JSON.stringify(data));
  const res = JSON.stringify(localStorage.getItem('answerHistory'));
  const end = performance.now();
  console.log('It took ' + (end - start) + 'ms.');
  // console.log(res);
};

const Questions: React.FC<Props> = ({ questions = [], favoriteAddButton = true }) => {
  const { t } = useTranslation();
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

  const handleAnswer = ({ answer, answerIsCurrect }: AnswerEvent) => {
    saveToStorage();

    setAnswerHistory((prev) => {
      const newHistory = [...prev];
      newHistory[questionIndex] = {
        questionIndex,
        status: answerIsCurrect ? QuestionStatus.Currect : QuestionStatus.Wrong,
        answer,
      };
      return newHistory;
    });

    // if (answerIsCurrect) {
    // auto move to next question
    setTimeout(() => {
      hanldeNextQuestionClick();
    }, 200);
    // }
  };

  if (!currentQuestion || !answerFromHistory) {
    return null;
  }

  return (
    <div className='questions'>
      <div className='statistic'>
        <div className='btn-prev-page'>
          <PiCaretLeftBold />
        </div>
        <Percent answerHistory={answerHistory} />
      </div>

      <AnswerHistory
        answerHistory={answerHistory}
        activeQuestionIndex={questionIndex}
        onSelectQuestion={handleSelectQuestionClick}
      />

      <Question
        item={currentQuestion}
        answerFromHistory={answerFromHistory.answer}
        enabled={answerFromHistory.status === QuestionStatus.NotAnswered}
        onAnswer={handleAnswer}
      />

      <div className='buttons'>
        <div>
          <FavoriteButton questionId={currentQuestion.id} addButton={favoriteAddButton} />

          <div className='favorite-btn report-btn'>
            <PiWarningLight size={16} /> {t('report')}
          </div>
        </div>

        {answerFromHistory.status === QuestionStatus.Wrong && !isLastQuestion && (
          <button className='next-question-btn' onClick={hanldeNextQuestionClick}>
            {t('nextQuestion')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
