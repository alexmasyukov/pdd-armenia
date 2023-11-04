import React from 'react';
import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  blue?: boolean;
  red?: boolean;
  largeFont?: boolean;
  counter?: number;
};

const Button: React.FC<Props> = ({ children, blue, red, largeFont, counter = 0 }) => {
  return (
    <div className={clsx('btn', { 'btn-blue': blue, 'btn-red': red, 'btn-large-font': largeFont })}>
      {children}
      {!!counter && <div className='counter'>{counter > 99 ? '99+' : counter}</div>}
    </div>
  );
};

export default Button;
