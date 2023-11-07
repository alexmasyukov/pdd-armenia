import clsx from 'clsx';
import React from 'react';

interface Props {
  text: string;
  isCorrect: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Answer: React.FC<Props> = ({ isCorrect, isWrong, text, onClick }) => {
  return (
    <li onClick={onClick} className={clsx({ correct: isCorrect }, { wrong: isWrong })}>
      {text}
    </li>
  );
};

export default Answer;
