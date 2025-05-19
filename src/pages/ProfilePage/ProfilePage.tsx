import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ProgressBar } from '../../components/progress-bar';
import { Button } from '../../components/button';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import profile_image from '../../assets/images/profile_image.svg';
import python_logo from '../../assets/images/python_logo.png';
import cpp_logo from '../../assets/images/cpp_logo.png';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Если пользователь не авторизован - перенаправляем на страницу авторизации
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      console.log('перенаправление');
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

  const LessonsNeeded = () => {
    if (currentUser.level == 'intermediate') return 10;
    if (currentUser.level == 'advanced') return 15;
    return 5;
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
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            gap: '5%',
            margin: '15px auto'
          }}
        >
          <img src={profile_image} alt='profile' />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '300px',
              justifyContent: 'flex-start'
            }}
          >
            <h1
              style={{
                color: '#00f0b1',
                margin: '32px 0 32px 5%',
                fontSize: '36px',
                fontFamily: 'monospace'
              }}
            >
              {currentUser.login}
            </h1>

            <div
              style={{
                fontFamily: 'Comfortaa',
                color: '#BBFAE9',
                margin: '0 0 0 5%',
                lineHeight: '1.5'
              }}
            >
              Уровень:{' '}
              {currentUser.level === 'beginner'
                ? 'Начинающий'
                : currentUser.level === 'intermediate'
                  ? 'Средний'
                  : 'Продвинутый'}
            </div>
          </div>

          <div style={{ position: 'absolute', right: '10%', top: '114px' }}>
            <Button
              onClick={logout}
              label='Выйти из аккаунта'
              sizeType='little'
            />
          </div>
        </div>

        <Text
          style={{
            fontFamily: 'Comfortaa',
            color: '#BBFAE9',
            margin: '40px 0 100px 0',
            lineHeight: '1.7'
          }}
        >
          Вы на верном пути! До следующего уровня осталось{' '}
          {LessonsNeeded() - currentUser.completedTopics.length} уроков.
        </Text>

        <ProgressBar
          icon={<img src={python_logo} alt='python' />}
          title='Python'
          percent={calculateProgress('python-basics')}
        />

        <ProgressBar
          icon={<img src={cpp_logo} alt='cpp' />}
          title='C++'
          percent={calculateProgress('cpp-advanced')}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
