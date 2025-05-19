import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  size?: number; // 1-6
  color?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  size = 1,
  color,
  style = {}
}) => {
  const Tag =
    `h${Math.min(6, Math.max(1, size))}` as keyof JSX.IntrinsicElements;

  // Дефолтные стили
  const defaultStyles: React.CSSProperties = {
    color: '#00f0b1',
    margin: '32px 0 32px 0',
    fontSize: '36px',
    fontFamily: 'monospace'
  };

  // Объединяем стили: дефолтные < переданные в пропсе style < переданные отдельно (color)
  const mergedStyles = {
    ...defaultStyles,
    ...style,
    color: color || defaultStyles.color
  };

  return <Tag style={mergedStyles}>{children}</Tag>;
};
