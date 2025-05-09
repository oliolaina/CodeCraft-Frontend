import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import LessonPage from './pages/LessonPage/LessonPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BlogPage from './pages/BlogPage/BlogPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/catalog' element={<CatalogPage />} />
      <Route path='/lesson' element={<LessonPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/blog' element={<BlogPage />} />
    </Routes>
  </Router>
);

export default App;
