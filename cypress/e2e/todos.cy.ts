describe('Todos App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearIndexedDB();
  });

  it('should add a new todo', () => {
    cy.get('input').type('New Todo{enter}');
    cy.get('[data-testid="todo-item"]').should('contain', 'New Todo');
  });

  it('should mark a todo as completed', () => {
    cy.get('[data-testid="todo-input"]').type('New Todo{enter}');
    cy.get('[data-testid="todo-toggle-complete"]').click();
    cy.get('[data-testid="todo-item-text"]')
      .should('have.css', 'text-decoration-line')
      .and('match', /line-through/);
  });

  it('should delete todo', () => {
    cy.get('[data-testid="todo-input"]').type('New Todo{enter}');
    cy.get('[data-testid="todo-item"]').realHover();
    cy.get('[data-testid="todo-delete"]').click();
    cy.get('[data-testid="todo-item"]').should('not.exist');
  });

  it('should filter todos', () => {
    cy.get('[data-testid="todo-input"]').type('Todo 1{enter}');
    cy.get('[data-testid="todo-input"]').type('Todo 2{enter}');
    cy.get('[data-testid="todo-toggle-complete"]').eq(1).click();

    // Filter by "Active"
    cy.get('[data-testid="filter-active"]').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 1);

    // Filter by "Completed"
    cy.get('[data-testid="filter-completed"]').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 1);

    // Filter by "All"
    cy.get('[data-testid="filter-all"]').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 2);
  });

  it('should correctly clear completed', () => {
    cy.get('[data-testid="todo-input"]').type('Todo 1{enter}');
    cy.get('[data-testid="todo-input"]').type('Todo 2{enter}');
    cy.get('[data-testid="todo-toggle-complete"]').eq(1).click();

    cy.contains('Clear completed').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 1);
  });
});
