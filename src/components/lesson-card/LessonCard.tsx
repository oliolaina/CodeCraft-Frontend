import React from 'react';
import styles from './LessonCard.module.css';

interface LessonCardProps {
  title: string;
  level: 'easy' | 'medium' | 'hard';
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
}) => {
  // Определяем класс в зависимости от уровня сложности
  const getLevelClass = () => {
    switch (level) {
      case 'easy':
        return styles.card_easy;
      case 'medium':
        return styles.card_medium;
      case 'hard':
        return styles.card_hard;
      default:
        return '';
    }
  };

  // Комбинируем базовый класс card с классом уровня
  const cardClasses = `${styles.card} ${getLevelClass()}`;

  return (
    <a
      className={cardClasses}
      href={to}
      style={background ? { background } : {}}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={`${styles.level} ${styles[`level_${level}`]}`}>
          {level}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </a>
  );
};
