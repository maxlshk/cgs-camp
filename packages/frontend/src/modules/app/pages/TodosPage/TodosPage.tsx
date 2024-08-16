import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { useFilterStore } from '~store/filter.store';
import { Spinner } from '@blueprintjs/core';
import { useSwitchDisplay } from '~shared/hooks/useSwitchDisplay';
import { spinnerStyles, todosContainerStyles } from './TodosPage.styles';
import { useInitialData } from '~shared/hooks/useInitialData';
import { Search } from '~shared/components/search/search.component';
import { FilterButtons } from '~modules/app/components/FilterButtons/FilterButtons';

export const TodosPage: React.FC = () => {
	const navigate = useNavigate();
	const { todos, isLoading: todoLoading, error: todoError } = useTodoStore();
	const { user, error: userError, isLoading: userLoading } = useUserStore();
	const { filters } = useFilterStore();
	const { displayType } = useSwitchDisplay();

	useInitialData();

	const updateFilters = (
		filterType: keyof typeof filters | 'page',
		value: string | null,
	): void => {
		const updatedFilters = { ...filters, [filterType]: value };
		const updatedParams = new URLSearchParams();
		Object.entries(updatedFilters).forEach(([key, val]) => {
			if (val !== null && val !== undefined && val !== '') {
				updatedParams.set(key, val.toString());
			}
		});
		const queryString = updatedParams.toString();
		navigate(queryString ? `?${queryString}` : '');
	};

	const handlePageChange = (newPage: number): void => {
		updateFilters('page', newPage.toString());
	};

	if (!user || !todos) {
		return (
			<div className={spinnerStyles}>
				<Spinner size={50} />
			</div>
		);
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<Search
				updateFilters={updateFilters}
				defaultValue={filters.search}
				placeholder="Search todos..."
			/>
			<FilterButtons
				updateFilters={updateFilters}
				displayType={displayType}
			/>
			<div className={todosContainerStyles}>
				{todoLoading || userLoading ? (
					<Spinner size={20} />
				) : (
					<TodoList
						displayType={displayType}
						handlePageChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	);
};
