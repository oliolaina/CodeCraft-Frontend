import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Tabs } from '../../components/tabs';
import { LessonCard } from '../../components/lesson-card';
import { BlogCard } from '../../components/blog-card';
import { ProgressBar } from '../../components/progress-bar';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import python_logo from '../../assets/images/python_logo.png';
import cpp_logo from '../../assets/images/cpp_logo.png';

const CatalogPage: React.FC = () => {
  const [tab, setTab] = useState('python');

  return (
    <div className={styles.page}>
      <Header
        links={[
          { label: 'О проекте', to: '/' },
          { label: 'Блог', to: '/blog' },
          { label: 'Каталог', to: '/catalog' }
        ]}
        profileLink={{ label: 'Профиль', to: '/profile' }}
      />
      <Heading
        size={1}
        color='#00F0B1'
        style={{
          fontFamily: 'Comfortaa',
          textShadow: '0 0 20px #FFC76E',
          color: '#FD9E02',
          textAlign: 'center'
        }}
      >
        Выбери язык программирования
      </Heading>
      <Tabs
        items={[
          {
            icon: <img src={python_logo} alt='python' />,
            label: 'Python',
            value: 'python'
          },
          { icon: <img src={cpp_logo} alt='c++' />, label: 'C++', value: 'cpp' }
        ]}
        value={tab}
        onChange={setTab}
      >
        <Heading
                size={1}
                color='#00F0B1'
                style={{
                  fontFamily: 'Comfortaa',
                  textShadow: '0 0 20px #06A77D',
                  color: '#00F0B1',
                  margin: '20px 0 20px 5%'
                }}
              >
                Программа обучения:
              </Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <LessonCard
            title='Введение в Python'
            level='easy'
            description='История языка, основы синтаксиса, первая программа'
            icon={<span>🐍</span>}
            to='#'
          />
          <LessonCard
            title='Условные конструкции и циклы'
            level='medium'
            description='if-else, switch-case, циклы (for, while, do-while)'
            icon={<span>🐍</span>}
            to='#'
          />
          <LessonCard
            title='Введение в C++'
            level='hard'
            description='История языка, основы синтаксиса, первая программа'
            icon={<span>💻</span>}
            to='#'
          />
        </div>
      </Tabs>
      <ProgressBar icon={<span>🐍</span>} title='Python' percent={60} />
      <BlogCard
        title='5 классных вещей, которые вы можете освоить с Python'
        description='Python — универсальный язык программирования...'
        image='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'
        to='#'
      />
      <Footer />
    </div>
  );
};

export default CatalogPage;
