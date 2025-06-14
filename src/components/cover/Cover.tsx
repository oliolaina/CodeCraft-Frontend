import React from 'react';
import { CoverBackground } from './CoverBackground';
import { CoverTitle } from './CoverTitle';
import { CoverIcons } from './CoverIcons';
import { Button } from '../button';
import python_logo from '../../assets/images/python_logo.png';
import cpp_logo from '../../assets/images/cpp_logo.png';
import { motion } from 'framer-motion';

interface CoverProps {
  onStart: () => void;
  onCppClick: () => void;
  onPythonClick: () => void;
  backgroundUrl: string;
}

export const Cover: React.FC<CoverProps> = ({
  onStart,
  onCppClick,
  onPythonClick,
  backgroundUrl
}) => (
  <CoverBackground imageUrl={backgroundUrl}>
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      <CoverTitle title='CodeCraft' subtitle='' />
      <motion.h2
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '36px',
          fontWeight: '700',
          color: '#ffc76e',
          margin: '3%',
          lineHeight: '1.3'
        }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        Код - это искусство
      </motion.h2>
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      >
        <CoverIcons
          icons={[
            {
              icon: <img src={python_logo} alt='python' />,
              label: 'Python',
              onClick: onPythonClick
            },
            {
              icon: <img src={cpp_logo} alt='c++' />,
              label: 'C++',
              onClick: onCppClick
            }
          ]}
        />
      </motion.div>
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
      >
        <Button label='Начать изучение' onClick={onStart} />
      </motion.div>
    </motion.div>
  </CoverBackground>
);
