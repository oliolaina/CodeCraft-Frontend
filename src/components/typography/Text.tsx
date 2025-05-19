import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  color,
  style = {}
}) => {
  // Дефолтные стили
  const defaultStyles: React.CSSProperties = {
    fontFamily: 'Comfortaa',
    color: '#BBFAE9',
    margin: '40px 0 40px 0',
    lineHeight: '1.5',
    fontSize: '18px' // Дефолтный размер
  };

  // Объединяем стили с правильным приоритетом:
  const mergedStyles = {
    ...defaultStyles,
    ...style,
    color: color ?? defaultStyles.color, // Используем ?? для null/undefined
    fontSize: size
      ? typeof size === 'number'
        ? `${size}px`
        : size
      : defaultStyles.fontSize
  };

  return <span style={mergedStyles}>{children}</span>;
};
