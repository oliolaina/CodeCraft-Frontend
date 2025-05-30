import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { CodeBlock } from '../../components/code-block';
import { CodeEditor } from '../../components/code-editor';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import coursesData from '../../data/courses.json';
import { checkTask } from '../../services/APIService';

const LessonPage: React.FC = () => {
  const [code, setCode] = React.useState('# Пишите здесь\n');
  const [isChecking, setIsChecking] = React.useState(false);
  const [checkResult, setCheckResult] = React.useState<string | null>(null);

  const { topicId } = useParams<{ topicId: string }>();
  const { currentUser } = useAuth();
  const { markTopicAsCompleted } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser);
  // Находим тему по ID
  const currentTopic = React.useMemo(() => {
    for (const course of coursesData.courses) {
      const topic = course.topics.find((t) => t.id === topicId);
      if (topic) {
        return {
          ...topic,
          courseTitle: course.title,
          courseId: course.id
        };
      }
    }
    return null;
  }, [topicId]);

  // Если тема не найдена - перенаправляем на 404 или каталог
  React.useEffect(() => {
    if (!currentTopic) {
      navigate('/catalog');
    }
  }, [currentTopic, navigate]);

  if (!currentTopic) {
    return null;
  }

  // Проверяем, пройдена ли тема
  const isCompleted = currentUser?.completedTopics.some(
    (ct) =>
      ct.courseId === currentTopic.courseId && ct.topicIds.includes(topicId!)
  );

  const handleTaskSubmit = async (task: string) => {
    if (!code.trim()) {
      setCheckResult('Код не может быть пустым');
      return;
    }

    setIsChecking(true);
    setCheckResult(null);

    try {
      const result = await checkTask(task, code);
      setCheckResult(result);

      if (result?.includes('Задача решена верно!')) {
        if (currentUser && currentTopic) {
          markTopicAsCompleted(currentTopic.courseId, topicId!);
          console.log('UPD', currentUser);
        }
      }
    } catch (error) {
      setCheckResult('Произошла ошибка при проверке задания');
      console.error('Check task error:', error);
    } finally {
      setIsChecking(false);
    }
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
        <div className={styles.lessonHeader}>
          <Heading size={1} style={{ margin: '30px 0' }}>
            {currentTopic.title}
          </Heading>
          <Text style={{ lineHeight: '40px', margin: '0' }}>
            Курс: {currentTopic.courseTitle}
          </Text>
          <Text style={{ lineHeight: '40px', margin: '0' }}>
            Сложность: {currentTopic.difficulty}
          </Text>
          {isCompleted && (
            <Text
              color='#00F0B1'
              style={{ lineHeight: '40px', border: '#00F0B1 2px solid' }}
            >
              ✓ Вы уже прошли этот урок
            </Text>
          )}
        </div>

        {currentTopic.blocks.map((block, index) => {
          switch (block.type) {
            case 'text':
              return (
                <div key={index} className={styles.block}>
                  <Text>{block.content}</Text>
                </div>
              );
            case 'image':
              return (
                <div key={index} className={styles.block}>
                  <img
                    src={block.content}
                    alt='Изображение из урока'
                    style={{
                      maxHeight: '500px',
                      margin: '20px auto',
                      borderRadius: '2%',
                      display: 'block'
                    }}
                  />
                </div>
              );
            case 'code':
              return (
                <div key={index} className={styles.block}>
                  <CodeBlock
                    code={block.content}
                    language={
                      currentTopic.courseId.includes('python')
                        ? 'python'
                        : 'cpp'
                    }
                  />
                </div>
              );
            case 'task':
              return (
                <div key={index} className={styles.block}>
                  <Heading>Задание:</Heading>
                  <Text>{block.content}</Text>
                  <CodeEditor
                    language={
                      currentTopic.courseId.includes('python')
                        ? 'python'
                        : 'cpp'
                    }
                    value={code}
                    onChange={setCode}
                    onSubmit={() => handleTaskSubmit(block.content)}
                  />
                  <div style={{ marginTop: '16px' }}>
                    {isChecking ? <Text>'Проверяем...'</Text> : ''}
                    {isChecking && <span className={styles.loader}>🌀</span>}
                    {checkResult && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '18px',
                          borderRadius: '4px'
                        }}
                      >
                        <Text>{checkResult}</Text>
                      </div>
                    )}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </main>
      <Footer />
    </div>
  );
};

export default LessonPage;
