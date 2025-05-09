import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button'
}) => (
  <button className={styles.button} onClick={onClick} type={type}>
    {label}
  </button>
);
