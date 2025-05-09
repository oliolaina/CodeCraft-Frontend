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
  style
}) => {
  const Tag =
    `h${Math.min(6, Math.max(1, size))}` as keyof JSX.IntrinsicElements;
  return <Tag style={{ color, ...style }}>{children}</Tag>;
};
