import { TodoActions } from '../todo-actions';
import { TodoForm } from '../todo-form';
import { TodoList } from '../todo-list';
import { UseTodos } from './use-todos';

export const Todos = () => {
  const {
    handleAddTodo,
    handleRemoveCompleted,
    handleRemoveTodo,
    handleToggleComplete,
    handleFilterChange,
    itemsNotCompleted,
    selectedFilter,
    filteredTodos,
  } = UseTodos();

  return (
    <div className="flex flex-col gap-2 text-lg">
      <h1>Todo App</h1>
      <TodoForm addTodo={handleAddTodo} />
      <TodoList
        todos={filteredTodos}
        onRemove={handleRemoveTodo}
        onToggle={handleToggleComplete}
      />
      <TodoActions
        itemsLeft={itemsNotCompleted}
        onClearCompleted={handleRemoveCompleted}
        selectedFilter={selectedFilter}
        onSelectFilter={handleFilterChange}
      />
    </div>
  );
};
