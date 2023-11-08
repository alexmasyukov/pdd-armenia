import React from 'react';
import clsx from 'clsx';
import s from './Progress.module.scss';

type Props = {
  max?: number;
  value: number;
  secondValue?: number;
  className?: string;
  variant?: 'primary' | 'secondary';
};

const Progress: React.FC<Props> = ({
  max = 100,
  value = 0,
  secondValue = 0,
  variant = 'primary',
  className,
}) => {
  const percent1 = Math.round((value / max) * 100);
  const percent2 = Math.round((secondValue / max) * 100);

  return (
    <div className={clsx(s.progress, { [s[`variant-${variant}`]]: variant }, className)}>
      <div
        className={s.value}
        style={{
          width: `${percent1}%`,
        }}
      />
      {percent2 > 0 && (
        <div
          className={s.secondValue}
          style={{
            width: `${percent2}%`,
          }}
        />
      )}
    </div>
  );
};

export default Progress;
