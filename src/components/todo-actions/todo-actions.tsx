import { type FC } from 'react';

import { TodoFilters, type TodoFiltersProps } from './todo-filters';

interface TodoActionsProps extends TodoFiltersProps {
  itemsLeft: number;
  onClearCompleted: () => void;
}

export const TodoActions: FC<TodoActionsProps> = (props) => {
  const { itemsLeft, onClearCompleted, ...rest } = props;

  return (
    <div className="font-sm flex items-center justify-between gap-4 text-neutral-600">
      <div data-testid="todo-count">{itemsLeft} items left</div>
      <TodoFilters {...rest} />
      <button type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
};
