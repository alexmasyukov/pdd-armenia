import React from 'react';
import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  blue?: boolean;
  red?: boolean;
  gray?: boolean;
  largeFont?: boolean;
  smallFont?: boolean;
  counter?: number;
  style?: React.CSSProperties;
};

const Button: React.FC<Props> = ({ children, blue, red, gray, largeFont, smallFont, counter = 0, style }) => {
  return (
    <div
      className={clsx('btn', {
        'btn-blue': blue,
        'btn-red': red,
        'btn-gray': gray,
        'btn-large-font': largeFont,
        'btn-small-font': smallFont,
      })}
      style={style}
    >
      {children}
      {!!counter && <div className='counter'>{counter > 99 ? '99+' : counter}</div>}
    </div>
  );
};

export default Button;
