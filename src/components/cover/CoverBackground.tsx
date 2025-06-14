import React from 'react';
import styles from './CoverBackground.module.css';
import { motion } from 'framer-motion';

interface CoverBackgroundProps {
  imageUrl: string;
  children?: React.ReactNode;
}

export const CoverBackground: React.FC<CoverBackgroundProps> = ({
  imageUrl,
  children
}) => (
  <div
    className={styles.background}
    //style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <motion.img
      src={imageUrl}
      className={styles.image}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
    {children}
  </div>
);
