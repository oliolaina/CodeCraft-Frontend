import styles from '../page.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { AuthForm } from '../../components/auth-form';
import { Footer } from '../../components/footer';
import { BlogCard } from '../../components/blog-card';
import { Heading, Text } from '../../components/typography';

const AuthPage: React.FC = () => {
  const { login, register, currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Если пользователь уже авторизован - перенаправляем на профиль
  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (loginValue: string, password: string) => {
    const result = login(loginValue, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Ошибка входа');
    }
  };

  const handleRegister = (loginValue: string, password: string) => {
    const result = register(loginValue, password);
    if (result.success) {
      const loginResult = login(loginValue, password);
      if (loginResult.success) {
        setError('Регистрация успешна! Войдите вручную');
        console.log('message sent');
      }
    } else {
      setError(result.error || 'Ошибка регистрации');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '60%',
        height: '50%',
        margin: '15vh auto 0'
      }}
    >
      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
      />
      <a
        href='/'
        style={{ margin: '0 auto', fontFamily: 'Comfortaa', color: '#fff' }}
      >
        На Главную
      </a>
    </div>
  );
};

export default AuthPage;
