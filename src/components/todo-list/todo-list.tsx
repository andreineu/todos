import { FC } from 'react';

import { Filter, Todo } from '@/lib/api';

interface TodoListProps {
  todos: Todo[];
  selectedFilter: Filter;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = (props) => {
  const { todos, selectedFilter, onRemove, onToggle } = props;

  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === 'active') {
      return !todo.completed;
    } else if (selectedFilter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
          <button onClick={() => onRemove(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
