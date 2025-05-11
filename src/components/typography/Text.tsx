import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 18,
  color,
  style
}) => (
  <span
    style={{
      fontSize: typeof size === 'number' ? `${size}px` : size,
      color,
      ...style
    }}
  >
    {children}
  </span>
);
