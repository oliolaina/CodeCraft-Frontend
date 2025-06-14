import React from 'react';
import styles from './FeatureCard.module.css';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  text: string;
  background?: string; // CSS background (color/gradient)
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  text,
  background
}) => (
  <motion.div
    className={styles.card}
    style={background ? { background } : {}}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className={styles.title}>{title}</div>
    <div className={styles.text}>{text}</div>
  </motion.div>
);
