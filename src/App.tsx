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
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, users, register, login, logout }}
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
