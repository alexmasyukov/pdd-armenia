import clsx from 'clsx';
import React from 'react';
import s from './Question.module.scss';

interface Props {
  text: string;
  isCorrect: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled?: boolean;
  showRightAnswer?: boolean;
  answered: boolean;
}

const Answer: React.FC<Props> = ({ isCorrect, isWrong, answered, showRightAnswer, text, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={clsx({
        [s.correct]: answered && isCorrect,
        [s.wrong]: answered && isWrong,
        [s.shouldShowRightAnswer]: showRightAnswer && isCorrect,
      })}
    >
      {text}
    </li>
  );
};

export default Answer;
