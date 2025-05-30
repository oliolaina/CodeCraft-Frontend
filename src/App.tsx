import { useState, useEffect } from 'react';
import { AuthContext, User } from './contexts/UserContext';
import {
  getUsersFromStorage,
  registerUser,
  loginUser
} from './services/AuthService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import LessonPage from './pages/LessonPage/LessonPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BlogPage from './pages/BlogPage/BlogPage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(getUsersFromStorage());

  useEffect(() => {
    // Восстановление текущего пользователя из localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const register = (login: string, password: string) => {
    const result = registerUser(login, password);
    if (result.success) {
      setUsers(getUsersFromStorage());
    }
    return result;
  };

  const login = (login: string, password: string) => {
    const result = loginUser(login, password);
    if (result.success) {
      setCurrentUser(users.find((u) => u.login === login)!);
    }
    return result;
  };

  const logout = () => {
    if (currentUser) {
      setUsers((prev) => {
        const existingIndex = prev.findIndex(
          (u) => u.login === currentUser.login
        );
        const updatedUsers =
          existingIndex >= 0
            ? [
                ...prev.slice(0, existingIndex),
                currentUser,
                ...prev.slice(existingIndex + 1)
              ]
            : [...prev, currentUser];

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    }
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const markTopicAsCompleted = (courseId: string, topicId: string) => {
    setCurrentUser((prevUser) => {
      if (!prevUser) return prevUser;
      console.log('prevUser', prevUser);

      // Проверяем, есть ли уже этот курс в completedTopics
      const courseIndex = prevUser.completedTopics.findIndex(
        (ct) => ct.courseId === courseId
      );

      let updatedCompletedTopics;

      if (courseIndex >= 0) {
        // Если курс уже есть, добавляем topicId если его ещё нет
        updatedCompletedTopics = [...prevUser.completedTopics];
        if (!updatedCompletedTopics[courseIndex].topicIds.includes(topicId)) {
          updatedCompletedTopics[courseIndex].topicIds.push(topicId);
        }
      } else {
        // Если курса нет, добавляем новую запись
        updatedCompletedTopics = [
          ...prevUser.completedTopics,
          { courseId, topicIds: [topicId] }
        ];
        console.log('added to context');
      }

      const updatedUser = {
        ...prevUser,
        completedTopics: updatedCompletedTopics
      };

      // Сохраняем в localStorage
      console.log('updatedUser', JSON.stringify(updatedUser));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      console.log('SAVED to LC', localStorage.getItem('currentUser'));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        register,
        login,
        logout,
        markTopicAsCompleted
      }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route path='/lesson/:topicId' element={<LessonPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
