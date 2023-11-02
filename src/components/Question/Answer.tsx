import clsx from 'clsx';
import React from 'react';

interface Props {
  text: string;
  isCurrect: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Answer: React.FC<Props> = ({ isCurrect, isWrong, text, onClick }) => {
  return (
    <li onClick={onClick} className={clsx({ currect: isCurrect }, { wrong: isWrong })}>
      {text}
    </li>
  );
};

export default Answer;
