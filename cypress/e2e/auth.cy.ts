describe('Авторизация и регистрация', () => {
  const testLogin = 'testuser' + Date.now();
  const testPassword = 'testpass';

  beforeEach(() => {
    cy.visit('/auth');
    // Очищаем localStorage для чистоты теста
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.reload();
  });

  it('Показывает ошибку при пустых полях', () => {
    cy.contains('Войти').click();
    cy.contains('Логин не может быть пустым');
  });

  it('Показывает ошибку при коротком пароле', () => {
    cy.get('input[type="text"]').type(testLogin);
    cy.get('input[type="password"]').type('123');
    cy.contains('Зарегистрироваться').click();
    cy.contains(/короткий/i);
  });

  it('Регистрирует нового пользователя', () => {
    cy.get('input[type="text"]').type(testLogin);
    cy.get('input[type="password"]').type(testPassword);
    cy.contains('Зарегистрироваться').click();
    cy.contains(/регистрация успешна/i);
  });

  it('Не даёт зарегистрировать существующего пользователя', () => {
    // Сначала регистрируем
    cy.get('input[type="text"]').type(testLogin);
    cy.get('input[type="password"]').type(testPassword);
    cy.contains('Зарегистрироваться').click();
    // Пробуем ещё раз
    cy.get('input[type="text"]').clear().type(testLogin);
    cy.get('input[type="password"]').clear().type(testPassword);
    cy.contains('Зарегистрироваться').click();
    cy.contains(/занят/i); // "Логин уже занят"
  });

  it('Входит с правильными данными', () => {
    // Сначала регистрируем
    cy.get('input[type="text"]').type(testLogin);
    cy.get('input[type="password"]').type(testPassword);
    cy.contains('Зарегистрироваться').click();
    // Входим
    cy.get('input[type="text"]').clear().type(testLogin);
    cy.get('input[type="password"]').clear().type(testPassword);
    cy.contains('Войти').click();
    cy.url().should('include', '/profile');
  });

  it('Показывает ошибку при неверном пароле', () => {
    // Сначала регистрируем
    cy.get('input[type="text"]').type(testLogin);
    cy.get('input[type="password"]').type(testPassword);
    cy.contains('Зарегистрироваться').click();
    // Входим с неверным паролем
    cy.get('input[type="text"]').clear().type(testLogin);
    cy.get('input[type="password"]').clear().type('wrongpass');
    cy.contains('Войти').click();
    cy.contains(/неверный пароль/i);
  });
});