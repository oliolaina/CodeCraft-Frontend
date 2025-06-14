import React from 'react';
import styles from './LessonCard.module.css';
import cpp_easy from '../../assets/images/topic_cards/cpp_easy.svg';
import cpp_medium from '../../assets/images/topic_cards/cpp_medium.svg';
import cpp_hard from '../../assets/images/topic_cards/cpp_hard.svg';
import python_easy from '../../assets/images/topic_cards/python_easy.svg';
import python_medium from '../../assets/images/topic_cards/python_medium.svg';
import python_hard from '../../assets/images/topic_cards/python_hard.svg';
import { motion } from 'framer-motion';

interface LessonCardProps {
  title: string;
  level: 'easy' | 'medium' | 'hard';
  language?: string;
  description: string;
  background?: string;
  to: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  level,
  language,
  description,
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

  const getImage = () => {
    switch (level) {
      case 'easy':
        return language === 'python' ? python_easy : cpp_easy;
      case 'medium':
        return language === 'python' ? python_medium : cpp_medium;
      case 'hard':
        return language === 'python' ? python_hard : cpp_hard;
      default:
        return '';
    }
  };

  // Комбинируем базовый класс card с классом уровня
  const cardClasses = `${styles.card} ${getLevelClass()}`;

  return (
    <motion.div
      style={{ width: '100%' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <a
        className={cardClasses}
        href={to}
        style={background ? { background } : {}}
      >
        <div className={styles.icon}>
          <img src={getImage()} className={styles.icon} alt='icon' />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={`${styles.level} ${styles[`level_${level}`]}`}>
            {level}
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      </a>
    </motion.div>
  );
};
