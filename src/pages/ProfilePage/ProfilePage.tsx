import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ProgressBar } from '../../components/progress-bar';
import { BlogCard } from '../../components/blog-card';
import styles from '../page.module.css';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Если пользователь не авторизован - перенаправляем на страницу авторизации
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  // Если пользователя нет - не рендерим содержимое
  if (!currentUser) {
    return null;
  }

  // Рассчитываем прогресс по курсам
  const calculateProgress = (courseId: string) => {
    const completedTopics =
      currentUser.completedTopics.find((course) => course.courseId === courseId)
        ?.topicIds.length || 0;

    const totalTopics = courseId === 'python-basics' ? 7 : 6;

    return Math.round((completedTopics / totalTopics) * 100);
  };

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

      <h1 style={{ color: '#00f0b1', margin: '32px 0 16px 0' }}>
        Профиль пользователя {currentUser.login}
      </h1>

      <div style={{ marginBottom: '16px' }}>
        Уровень:{' '}
        {currentUser.level === 'beginner'
          ? 'Начинающий'
          : currentUser.level === 'intermediate'
            ? 'expert'
            : 'Продвинутый'}
      </div>

      <ProgressBar
        icon={<span>🐍</span>}
        title='Python'
        percent={calculateProgress('python-basics')}
      />

      <ProgressBar
        icon={<span>💻</span>}
        title='C++'
        percent={calculateProgress('cpp-advanced')}
      />

      <BlogCard
        title='Вы на верном пути!'
        description={`До следующего уровня осталось ${5 - currentUser.completedTopics.length} уроков.`}
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
        onClick={logout}
      >
        Выйти из аккаунта
      </button>

      <Footer />
    </div>
  );
};

export default ProfilePage;
