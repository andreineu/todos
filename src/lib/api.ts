import localforage from 'localforage';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';

type AddTodoPayload = Omit<Todo, 'id' | 'completed'>;

class TodoApi {
  storage: LocalForage;

  constructor() {
    this.storage = localforage.createInstance({
      name: 'todos',
    });
  }

  public async getTodos() {
    const todos = await this.storage.getItem<Todo[]>('todos');

    return todos ?? [];
  }

  public async addTodo(payload: AddTodoPayload) {
    const todos = await this.getTodos();

    const todo = {
      ...payload,
      id: Date.now(),
      completed: false,
    };

    todos?.push(todo);

    await this.storage.setItem('todos', todos);

    return todo;
  }

  public async deleteTodo(id: number) {
    const todos = await this.storage.getItem<Todo[]>('todos');

    todos?.filter((todo) => todo.id !== id);

    await this.storage.setItem('todos', todos);
  }

  public async toggleTodo(id: number) {
    const todos = await this.storage.getItem<Todo[]>('todos');

    if (!todos) {
      return;
    }

    const todoIdx = todos?.findIndex((todo) => todo.id === id);
    if (todoIdx === -1) {
      return;
    }

    todos[todoIdx]!.completed = !todos[todoIdx]!.completed;

    await this.storage.setItem('todos', todos);

    return todos[todoIdx]!;
  }
}

export const todoApi = new TodoApi();
