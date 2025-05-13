import React, { createContext, useContext, useState, useEffect } from 'react';

// Типы
export type User = {
  login: string;
  password: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  completedTopics: {
    courseId: string;
    topicIds: string[];
  }[];
};

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  register: (
    login: string,
    password: string
  ) => { success: boolean; error?: string | null };
  login: (
    login: string,
    password: string
  ) => { success: boolean; error?: string | null };
  logout: () => void;
};

// Создаём контекст с дефолтными значениями
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  users: [],
  register: () => ({ success: false, error: 'Контекст не инициализирован' }),
  login: () => ({ success: false, error: 'Контекст не инициализирован' }),
  logout: () => {}
});

// Хук для удобного использования
export const useAuth = () => useContext(AuthContext);

// Экспортируем сам контекст (провайдер будет в App.tsx)
export { AuthContext };
