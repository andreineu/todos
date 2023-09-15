import { FC } from 'react';

import { Filter } from '@/lib/api';

interface TodoFiltersProps {
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export const TodoFilters: FC<TodoFiltersProps> = (props) => {
  const { selectedFilter, onSelectFilter } = props;

  return (
    <div>
      Show:
      <button
        onClick={() => onSelectFilter('all')}
        style={{ fontWeight: selectedFilter === 'all' ? 'bold' : 'normal' }}
      >
        All
      </button>
      <button
        onClick={() => onSelectFilter('active')}
        style={{ fontWeight: selectedFilter === 'active' ? 'bold' : 'normal' }}
      >
        Active
      </button>
      <button
        onClick={() => onSelectFilter('completed')}
        style={{
          fontWeight: selectedFilter === 'completed' ? 'bold' : 'normal',
        }}
      >
        Completed
      </button>
    </div>
  );
};
