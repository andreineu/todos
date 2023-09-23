import { type Locator, expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
];

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    await page.waitForSelector('[data-testid="todo-item"]');

    await expect(page.getByTestId('todo-item')).toHaveText([TODO_ITEMS[0]]);

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    await expect(page.getByTestId('todo-item')).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);
  });

  test('should clear text input field when an item is added', async ({
    page,
  }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({
    page,
  }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    for (const item of TODO_ITEMS) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    await expect(page.getByTestId('todo-item')).toHaveText(TODO_ITEMS);
  });
});

test.describe('Item', () => {
  test('should allow me to mark items as complete', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();

    const secondTodo = page.getByTestId('todo-item').nth(1);
    await secondTodo.getByRole('checkbox').check();

    await checkTodoIsCompleted(firstTodo);
    await checkTodoIsCompleted(secondTodo);
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const firstTodo = page.getByTestId('todo-item').nth(0);
    const firstTodoCheckbox = firstTodo.getByRole('checkbox');

    await firstTodoCheckbox.check();
    await checkTodoIsCompleted(firstTodo);

    await firstTodoCheckbox.uncheck();
    await checkTodoIsNotCompleted(firstTodo);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    const todoCount = page.getByTestId('todo-count');
    await expect(todoCount).toContainText('1');

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    await expect(todoCount).toContainText('2');
  });
});

test.describe('Clear completed button', () => {
  test('should remove completed items when clicked', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    for (const item of TODO_ITEMS) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new todo...');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const todoItems = page.getByTestId('todo-item');
    const firstTodoCheck = todoItems.nth(0).getByRole('checkbox');
    await firstTodoCheck.check();

    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await checkTodoIsCompleted(todoItems.nth(0));
    await checkTodoIsNotCompleted(todoItems.nth(1));

    await page.reload();

    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await checkTodoIsCompleted(todoItems.nth(0));
    await checkTodoIsNotCompleted(todoItems.nth(1));
  });
});

async function checkTodoIsCompleted(todo: Locator) {
  const checkbox = todo.getByRole('checkbox');
  const todoText = todo.getByTestId('todo-item-text');
  const textDecoration = await todoText.evaluate(
    (element) => getComputedStyle(element).textDecoration,
  );

  await expect(checkbox).toBeChecked();
  expect(textDecoration).toContain('line-through');
}

async function checkTodoIsNotCompleted(todo: Locator) {
  const checkbox = todo.getByRole('checkbox');
  const todoText = todo.getByTestId('todo-item-text');
  const textDecoration = await todoText.evaluate(
    (element) => getComputedStyle(element).textDecoration,
  );

  await expect(checkbox).not.toBeChecked();
  expect(textDecoration).not.toContain('line-through');
}
