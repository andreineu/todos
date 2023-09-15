import { FC, FormEvent, useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
