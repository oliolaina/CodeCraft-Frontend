import styles from '../page.module.css';

import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { BlogCard } from '../../components/blog-card';
import { ProgressBar } from '../../components/progress-bar';
import { Tabs } from '../../components/tabs';

const BlogPage: React.FC = () => {
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
      <h1 style={{ color: '#00f0b1', margin: '32px 0 16px 0' }}>Блог</h1>
      <Tabs
        items={[
          { icon: <span>🐍</span>, label: 'Python', value: 'python' },
          { icon: <span>💻</span>, label: 'C++', value: 'cpp' }
        ]}
        value={tab}
        onChange={setTab}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <BlogCard
            title='8 способов нахождения НОД'
            description='Эта статья появилась на свет совершенно неожиданно...'
            image='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            to='#'
          />
          <BlogCard
            title='5 классных вещей, которые вы можете освоить с Python'
            description='Python — универсальный язык программирования...'
            image='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'
            to='#'
          />
        </div>
      </Tabs>
      <ProgressBar icon={<span>🐍</span>} title='Python' percent={50} />
      <Footer />
    </div>
  );
};

export default BlogPage;
