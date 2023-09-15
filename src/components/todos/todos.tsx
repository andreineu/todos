import React, { useEffect, useState } from 'react';

import { Filter, Todo, todoApi } from '@/lib/api';

import { TodoFilters } from '../todo-filter';
import { TodoForm } from '../todo-form';
import { TodoList } from '../todo-list';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  useEffect(() => {
    async function fetchTodos() {
      const savedTodos = await todoApi.getTodos();
      setTodos(savedTodos);
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo: string) => {
    const todo = await todoApi.addTodo({ text: newTodo });
    setTodos([...todos, todo]);
  };

  const handleRemoveTodo = (id: number) => {
    todoApi.deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    todoApi.toggleTodo(id);
    setTodos(updatedTodos);
  };

  const handleFilterChange = (filter: Filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={handleAddTodo} />
      <TodoList
        selectedFilter={selectedFilter}
        todos={todos}
        onRemove={handleRemoveTodo}
        onToggle={handleToggleComplete}
      />
      <TodoFilters
        selectedFilter={selectedFilter}
        onSelectFilter={handleFilterChange}
      />
    </div>
  );
};
