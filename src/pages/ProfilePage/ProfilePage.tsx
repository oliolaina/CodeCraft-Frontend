import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ProgressBar } from '../../components/progress-bar';
import { AuthForm } from '../../components/auth-form';
import { BlogCard } from '../../components/blog-card';
import styles from '../page.module.css';

const ProfilePage: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

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
        Профиль пользователя
      </h1>
      {isAuth ? (
        <>
          <ProgressBar icon={<span>🐍</span>} title='Python' percent={70} />
          <ProgressBar icon={<span>💻</span>} title='C++' percent={30} />
          <BlogCard
            title='Вы на верном пути!'
            description='До следующего уровня осталось 2 урока.'
            image='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'
            to='#'
          />
          <button
            style={{
              margin: '32px 0',
              padding: '12px 32px',
              borderRadius: 12,
              background: '#fd9e02',
              color: '#fff',
              border: 'none',
              fontWeight: 700
            }}
            onClick={() => setIsAuth(false)}
          >
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <AuthForm
          onRegister={() => setIsAuth(true)}
          onLogin={() => setIsAuth(true)}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;
