import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { CodeBlock } from '../../components/code-block';
import { CodeEditor } from '../../components/code-editor';
import { ProgressBar } from '../../components/progress-bar';
import { BlogCard } from '../../components/blog-card';
import styles from '../page.module.css';

const LessonPage: React.FC = () => {
  const [code, setCode] = useState('print("Hello, world!")');

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
      <h1 style={{ color: '#00f0b1', margin: '32px 0 16px 0' }}>
        Урок: Переменные и типы данных
      </h1>
      <CodeBlock language='python' code={'a = 10\nb = 20\nprint(a + b)'} />
      <CodeEditor
        language='python'
        value={code}
        onChange={setCode}
        onSubmit={() => alert('Код отправлен: ' + code)}
      />
      <ProgressBar icon={<span>🐍</span>} title='Python' percent={80} />
      <BlogCard
        title='С++: разбираешься ли ты в управлении памятью?'
        description='В этом квизе мы проверим, насколько ты разбираешься в управлении памятью...'
        image='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
        to='#'
      />
      <Footer />
    </div>
  );
};

export default LessonPage;
