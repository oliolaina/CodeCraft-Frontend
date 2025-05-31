describe('Функциональное тестирование CodeCraft', () => {
  it('Главная страница открывается и содержит заголовок', () => {
    cy.visit('/');
    cy.contains('CodeCraft');
  });

  it('Кнопка "Начать изучение" ведет на каталог', () => {
    cy.visit('/');
    cy.contains('Начать изучение').click();
    cy.url().should('include', '/catalog');
  });

  it('Каталог отображается и содержит карточки уроков', () => {
    cy.visit('/catalog');
    cy.get('[href^="/lesson/"]').should('exist');
  });

  it('Переход на страницу урока из каталога', () => {
    cy.visit('/catalog');
    cy.get('[href^="/lesson/"]').first().click();
    cy.url().should('include', '/lesson/');
    cy.contains('Синтаксис и базовые конструкции');
  });

  it('Страница урока содержит редактор кода и кнопку отправки', () => {
    cy.visit('/lesson/python-1');
    cy.get('[data-testid="code-editor"]').should('exist');
    cy.contains('Синтаксис').should('exist');
  });

  it('Переход на страницу профиля через хедер без авторизации', () => {
    cy.visit('/');
    cy.get('a').contains('Профиль').click();
    cy.url().should('include', '/auth');
    cy.contains('Логин');
  });

  it('Переход на страницу блога через хедер', () => {
    cy.visit('/');
    cy.get('a').contains('Блог').click();
    cy.url().should('include', '/blog');
    cy.contains('Блог');
  });

  it('Форма авторизации: ввод логина и пароля', () => {
    cy.visit('/auth');
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="password"]').type('testpass');
    cy.contains('Войти').click();
  });

  it('Переход между страницами через хедер', () => {
    cy.visit('/');
    cy.get('a').contains('Каталог').click();
    cy.url().should('include', '/catalog');
    cy.get('a').contains('Блог').click();
    cy.url().should('include', '/blog');
  });
}); 