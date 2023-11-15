import React from 'react';
import clsx from 'clsx';
import { IconType, IconBaseProps } from 'react-icons';
import s from './TextButton.module.scss';

interface Props {
  icon?: IconType;
  iconProps?: IconBaseProps;
  variant?: 'normal' | 'small';
  color?: 'gray' | 'blue' | 'red';
  onClick?: () => void;
  children?: React.ReactNode | string | number;
}

const TextButton: React.FC<Props> = ({
  icon,
  iconProps,
  variant = 'normal',
  color = 'blue',
  children,
  onClick,
}) => {
  const Icon = icon;

  return (
    <button
      className={clsx(s['text-btn'], { [s[`variant-${variant}`]]: variant, [s[`color-${color}`]]: color })}
      onClick={onClick}
    >
      {Icon && (
        <Icon {...iconProps} size={iconProps?.size ?? 20} className={clsx(s.icon, iconProps?.className)} />
      )}
      {Icon && ' '}
      {children}
    </button>
  );
};

export default TextButton;
