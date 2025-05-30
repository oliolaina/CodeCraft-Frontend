import { User } from '../contexts/UserContext';

// Функции для работы с пользователями
export const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Валидация
export const validateLogin = (login: string, users: User[]): string | null => {
  if (!login) return 'Логин не может быть пустым';
  if (users.some((u) => u.login === login)) return 'Логин уже занят';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Пароль не может быть пустым';
  if (password.length < 5) return 'Пароль слишком короткий';
  return null;
};

// Регистрация и вход
export const registerUser = (
  login: string,
  password: string
): { success: boolean; error?: string | null } => {
  const users = getUsersFromStorage();
  const loginError = validateLogin(login, users);
  const passwordError = validatePassword(password);

  if (loginError || passwordError) {
    return { success: false, error: loginError || passwordError };
  }

  const newUser: User = {
    login,
    password,
    level: 'beginner',
    completedTopics: []
  };

  saveUsersToStorage([...users, newUser]);
  return { success: true };
};

export const loginUser = (
  login: string,
  password: string
): { success: boolean; error?: string } => {
  const users = getUsersFromStorage();
  const user = users.find((u) => u.login === login);

  if (!user) return { success: false, error: 'Пользователь не найден' };
  if (user.password !== password)
    return { success: false, error: 'Неверный пароль' };

  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true };
};
