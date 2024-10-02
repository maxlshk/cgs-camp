import React, { useEffect } from 'react';
import { TodoList } from '~/shared/ui/todo-list/todo-list.component';
import { Spinner } from '@blueprintjs/core';
import { useDisplayType } from '~shared/hooks/useDisplayType';
import { useTodoStore } from '~store/todo.store';
import { spinnerStyles, todosContainerStyles } from './dashboard.styles';

export const Dashboard: React.FC = () => {
	const { fetchTodos, isLoading, error } = useTodoStore();
	const { displayType } = useDisplayType();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className={todosContainerStyles}>
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
