import React from 'react';
import clsx from 'clsx';
import { AnswerHistory as AnswerHistoryType, QuestionIndex } from '../../types';

interface Props {
  answerHistory: AnswerHistoryType;
  activeQuestionIndex: QuestionIndex;
  onSelectQuestion: (questionIndex: QuestionIndex) => () => void;
}

const AnswerHistory: React.FC<Props> = ({ answerHistory, activeQuestionIndex, onSelectQuestion }) => {
  return (
    <ul className='question-numbers'>
      {answerHistory.map((item, index) => (
        <li
          key={index}
          className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
          onClick={onSelectQuestion(index)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default AnswerHistory;
