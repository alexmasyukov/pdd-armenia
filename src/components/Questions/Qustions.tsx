import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import { AnswerEvent, AnswerHistory as AnswerHistoryType, Question as QuestionType } from '../../types';
import { QuestionStatus } from '../../enums';
import AnswerHistory from '../AnswerHistory/AnswerHistory';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

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

const Questions: React.FC<Props> = ({ questions = [], favoriteAddButton = true }) => {
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
    setAnswerHistory((prev) => {
      const newHistory = [...prev];
      newHistory[questionIndex] = {
        questionIndex,
        status: answerIsCurrect ? QuestionStatus.Currect : QuestionStatus.Wrong,
        answer,
      };
      return newHistory;
    });

    if (answerIsCurrect) {
      // auto move to next question
      hanldeNextQuestionClick();
    }
  };

  if (!currentQuestion || !answerFromHistory) {
    return null;
  }

  return (
    <div className='questions'>
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
        <FavoriteButton questionId={currentQuestion.id} addButton={favoriteAddButton} />

        {answerFromHistory.status === QuestionStatus.Wrong && !isLastQuestion && (
          <button className='next-question-btn' onClick={hanldeNextQuestionClick}>
            Следующий вопрос
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
