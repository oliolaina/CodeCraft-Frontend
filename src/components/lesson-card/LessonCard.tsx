import React from 'react';
import styles from './LessonCard.module.css';

interface LessonCardProps {
  title: string;
  level: string;
  description: string;
  icon: React.ReactNode;
  background?: string;
  to: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  level,
  description,
  icon,
  background,
  to
}) => (
  <a className={styles.card} href={to} style={background ? { background } : {}}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.level}>{level}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </a>
);
