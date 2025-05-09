import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Tabs } from '../../components/tabs';
import { LessonCard } from '../../components/lesson-card';
import { BlogCard } from '../../components/blog-card';
import { ProgressBar } from '../../components/progress-bar';
import styles from '../page.module.css';

const CatalogPage: React.FC = () => {
  const [tab, setTab] = useState('python');

  return (
    <div className={styles.page}>
      <Header
        links={[
          { label: 'О проекте', to: '#' },
          { label: 'Блог', to: '#' },
          { label: 'Каталог', to: '#' }
        ]}
        profileLink={{ label: 'Профиль', to: '#' }}
      />
      <Tabs
        items={[
          { icon: <span>🐍</span>, label: 'Python', value: 'python' },
          { icon: <span>💻</span>, label: 'C++', value: 'cpp' }
        ]}
        value={tab}
        onChange={setTab}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <LessonCard
            title='Введение в Python'
            level='Лёгкий'
            description='История языка, основы синтаксиса, первая программа'
            icon={<span>🐍</span>}
            to='#'
          />
          <LessonCard
            title='Условные конструкции и циклы'
            level='Лёгкий'
            description='if-else, switch-case, циклы (for, while, do-while)'
            icon={<span>🐍</span>}
            to='#'
          />
          <LessonCard
            title='Введение в C++'
            level='Лёгкий'
            description='История языка, основы синтаксиса, первая программа'
            icon={<span>💻</span>}
            to='#'
            background='linear-gradient(135deg, #52d7ffe5 0%, #2b6dbd 100%)'
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
