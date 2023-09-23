import { useEffect, useMemo, useState } from 'react';

import { type Filter, type Todo, todoApi } from '@/lib/api';

export const UseTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  useEffect(() => {
    async function fetchTodos() {
      const savedTodos = await todoApi.getTodos();
      setTodos(savedTodos);
    }
    fetchTodos();
  }, []);

  const itemsNotCompleted = todos.filter((todo) => !todo.completed).length;

  const handleAddTodo = async (newTodo: string) => {
    setIsLoading(true);

    const todo = await todoApi.addTodo({ text: newTodo });
    setTodos([...todos, todo]);

    setIsLoading(false);
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

  const handleRemoveCompleted = () => {
    todoApi.deleteCompletedTodos();
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (selectedFilter === 'active') {
          return !todo.completed;
        } else if (selectedFilter === 'completed') {
          return todo.completed;
        }
        return true;
      }),
    [selectedFilter, todos],
  );

  return {
    handleAddTodo,
    handleRemoveCompleted,
    handleRemoveTodo,
    handleToggleComplete,
    handleFilterChange,
    itemsNotCompleted,
    selectedFilter,
    filteredTodos,
    isLoading,
  };
};
