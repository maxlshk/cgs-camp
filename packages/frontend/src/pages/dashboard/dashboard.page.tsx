import React, { useEffect } from 'react';
import { TodoList } from '~/shared/ui/todo-list/todo-list.component';
import { Spinner } from '@blueprintjs/core';
import { useDisplayType } from '~shared/hooks/useDisplayType';
import { useTodoStore } from '~store/todo.store';
import {
	filterContainerStyles,
	spinnerStyles,
	todosContainerStyles,
} from './dashboard.styles';
import { Filters } from '~shared/ui/filters/filters.component';
import { Search } from '~shared/components/search/search.component';
import { useFilters } from '~shared/hooks/useFilters';
import { DisplayType } from '~shared/types/display.type';

export const Dashboard: React.FC = () => {
	const { fetchTodos, isLoading, error } = useTodoStore();
	const { displayType } = useDisplayType();
	const { currentFilters, updateFilters } = useFilters();

	useEffect(() => {
		const append = displayType !== DisplayType.DESKTOP;
		fetchTodos(currentFilters, append);
	}, [fetchTodos, currentFilters, displayType]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className={todosContainerStyles}>
			<div className={filterContainerStyles}>
				<Search
					updateFilters={updateFilters}
					defaultValue={currentFilters.search}
					placeholder="Search todos..."
				/>
				<Filters
					currentFilters={currentFilters}
					updateFilters={updateFilters}
				/>
			</div>
			{isLoading ? (
				<div className={spinnerStyles}>
					<Spinner size={20} />
				</div>
			) : (
				<TodoList displayType={displayType} />
			)}
		</div>
	);
};
