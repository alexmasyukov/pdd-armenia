import React from 'react';
import clsx from 'clsx';
import s from './Progress.module.scss';

type Props = {
  max?: number;
  value: number;
  className?: string;
};

const Progress: React.FC<Props> = ({ max = 100, value = 50, className }) => {
  const percent = (value / max) * 100;

  return (
    <div className={clsx(s.progress, className)}>
      <div
        className={s.value}
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  );
};

export default Progress;
