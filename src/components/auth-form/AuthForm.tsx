import React, { useState } from 'react';
import {Heading, Text} from "../../components/typography";
import styles from './AuthForm.module.css';

interface AuthFormProps {
  onRegister: (login: string, password: string) => void;
  onLogin: (login: string, password: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onRegister, onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Text color = "#FD9E02" size = {30} style = {{fontFamily: 'monospace', textShadow: '0 0 20px #06A77D', margin: '0 auto'}}>
            Авторизация</Text>
      <label className={styles.label}>
        Логин
        <input
          className={styles.input}
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete='username'
        />
      </label>
      <label className={styles.label}>
        Пароль
        <input
          className={styles.input}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
      </label>
      <div className={styles.buttons}>
        <button
          type='button'
          className={styles.register}
          onClick={() => onRegister(login, password)}
        >
          Зарегистрироваться
        </button>
        <button
          type='button'
          className={styles.login}
          onClick={() => onLogin(login, password)}
        >
          Войти
        </button>
      </div>
    </form>
  );
};
