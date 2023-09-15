import { type FC } from 'react';

import { type Todo } from '@/lib/api';

import { Trash } from '../icons';

interface TodoListProps {
  todos: Todo[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = (props) => {
  const { todos, onRemove, onToggle } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="group flex justify-between">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="peer h-4 w-4 rounded border-neutral-300 bg-neutral-100 text-blue-600"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="transition-colors peer-checked:text-neutral-400 peer-checked:line-through">
              {todo.text}
            </span>
          </label>
          <button
            className="invisible ml-auto text-neutral-700 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
            onClick={() => onRemove(todo.id)}
          >
            <Trash />
          </button>
        </li>
      ))}
    </ul>
  );
};
