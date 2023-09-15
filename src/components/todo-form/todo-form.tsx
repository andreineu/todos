import { type FC, type FormEvent, useState } from 'react';

interface TodoFormProps {
  addTodo: (newTodo: string) => void;
}

export const TodoForm: FC<TodoFormProps> = (props) => {
  const { addTodo } = props;

  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <input
        data-testid="todo-input"
        className="focus-visible:ring-ring flex h-9 w-full rounded-md border border-neutral-600 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        type="submit"
        className="focus-visible:ring-ring inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
};
