import { type FC } from 'react';

import clsx from 'clsx';

import { type Filter } from '@/lib/api';

export interface TodoFiltersProps {
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export const TodoFilters: FC<TodoFiltersProps> = (props) => {
  const { selectedFilter, onSelectFilter } = props;

  return (
    <div className="flex justify-between">
      <button
        data-testid="filter-all"
        onClick={() => onSelectFilter('all')}
        className={clsx(
          selectedFilter === 'all' && 'border border-neutral-400',
          'rounded-lg px-2 py-1',
        )}
      >
        All
      </button>
      <button
        data-testid="filter-active"
        onClick={() => onSelectFilter('active')}
        className={clsx(
          selectedFilter === 'active' && 'border border-neutral-400',
          'rounded-lg px-2 py-1',
        )}
      >
        Active
      </button>
      <button
        data-testid="filter-completed"
        onClick={() => onSelectFilter('completed')}
        className={clsx(
          selectedFilter === 'completed' && 'border border-neutral-400',
          'rounded-lg px-2 py-1',
        )}
      >
        Completed
      </button>
    </div>
  );
};
