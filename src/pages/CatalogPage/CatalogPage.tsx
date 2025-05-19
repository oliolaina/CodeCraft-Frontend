import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Tabs } from '../../components/tabs';
import { LessonCard } from '../../components/lesson-card';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import python_logo from '../../assets/images/python_logo.png';
import cpp_logo from '../../assets/images/cpp_logo.png';
import courseData from '../../data/courses.json';

const CatalogPage: React.FC = () => {
  const [tab, setTab] = useState('python');

  // Преобразуем difficulty в level для компонента LessonCard
  const mapDifficultyToLevel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
      case 'easy':
        return 'easy';
      case 'intermediate':
      case 'medium':
        return 'medium';
      case 'advanced':
      case 'hard':
        return 'hard';
      default:
        return 'easy';
    }
  };

  // Получаем текущий курс по выбранному языку
  const currentCourse = courseData.courses.find(
    (course) => course.language === tab
  );

  const getDescription = () =>
    tab === 'python'
      ? courseData.courses[0].description
      : courseData.courses[1].description;

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
        <Heading
          size={1}
          color='#FD9E02'
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
            {
              icon: <img src={cpp_logo} alt='c++' />,
              label: 'C++',
              value: 'cpp'
            }
          ]}
          value={tab}
          onChange={setTab}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              width: '85%',
              margin: '20px auto'
            }}
          >
            <Text
              style={{
                fontFamily: 'Comfortaa',
                color: '#BBFAE9',
                margin: '20px 0 20px 0',
                lineHeight: '1.5'
              }}
            >
              {getDescription()}
            </Text>
            <Heading
              size={1}
              color='#00F0B1'
              style={{
                fontFamily: 'Comfortaa',
                textShadow: '0 0 20px #06A77D',
                color: '#00F0B1',
                margin: '20px 0 20px -3%'
              }}
            >
              Программа обучения:
            </Heading>
            {currentCourse?.topics.map((topic) => (
              <LessonCard
                key={topic.id}
                title={topic.title}
                level={mapDifficultyToLevel(topic.difficulty)}
                language={tab}
                description={topic.description}
                to={`/lesson/${topic.id}`}
              />
            ))}
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
