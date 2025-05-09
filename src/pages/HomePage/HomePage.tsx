import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Cover } from '../../components/cover';
import { FeatureCard } from '../../components/feature-card';
import { BlogCard } from '../../components/blog-card';
import { ProgressBar } from '../../components/progress-bar';
import { Tabs } from '../../components/tabs';
import { CodeBlock } from '../../components/code-block';
import { CodeEditor } from '../../components/code-editor';
import { AuthForm } from '../../components/auth-form';
import {Heading, Text} from "../../components/typography";
import styles from '../page.module.css';
import cover from "../../assets/images/cover_main.png"
import pic1 from "../../assets/images/mainPagePics/pic1.svg"
import pic2 from "../../assets/images/mainPagePics/pic2.svg"
import pic3 from "../../assets/images/mainPagePics/pic3.svg"

const HomePage: React.FC = () => {
  const [tab, setTab] = useState('python');
  const [code, setCode] = useState('print("Hello, world!")');

  return (
    <div className={styles.page}>
      <Header
        links={[
          { label: 'О проекте', to: '#first' },
          { label: 'Блог', to: '/blog' },
          { label: 'Каталог', to: '/catalog' }
        ]}
        profileLink={{ label: 'Профиль', to: '#' }}
      />
      <Cover
        onStart={() => alert('Начать изучение!')}
        onCppClick={() => setTab('cpp')}
        onPythonClick={() => setTab('python')}
        backgroundUrl= {cover}
      />
      <div
        style={{ display: 'flex', flexDirection: 'column', width: '75%', gap: 24, flexWrap: 'wrap', margin: '40px auto' }}
      >
        <div id = 'first'
        style={{ display: 'flex', gap: 24, justifyContent: 'space-between', margin: '50px 0' }}>
        <FeatureCard
          title='Практика с первого дня'
          text='Теория и задачи в одном месте. Теория знакомит с новой темой, а практические задания закрепляют знания.'
        />
        <img src = {pic1} alt = 'pic1'/>
        </div>
        <div
        style={{ display: 'flex', gap: 50, justifyContent: 'space-between', margin: '50px 0' }}>
        <img src = {pic2} alt = 'pic2'/>
        <FeatureCard
          title='Для всех уровней'
          text='Найдите задачи для любого уровня: от новичка до эксперта. Развивайтесь в своем темпе.'
        />
        </div>
        <div
        style={{ display: 'flex', gap: 24, justifyContent: 'space-between', margin: '50px 0' }}>
        <FeatureCard
          title='Прогресс всегда под рукой'
          text='Сохранение результатов и отслеживание вашего прогресса в обучении.'
        />
        <img src = {pic3} alt = 'pic3'/>
        </div>
      </div>
      
      <Heading size={1} color='#00F0B1' style = {{fontFamily: 'Comfortaa',  textShadow: '0 0 20px #06A77D', color: '#00F0B1', textAlign: 'center'}} >Начни учиться прямо сейчас!</Heading>
      <AuthForm onRegister={() => {}} onLogin={() => {}} />
      <Footer />
    </div>
  );
};

export default HomePage;
