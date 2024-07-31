import React, { useEffect } from 'react';
import { TodoList } from '../list/todo.list.component';
import { TodoForm } from '../form/todo.form.component';
import { useTodoStore } from '~store/todo.store';

export const TodoContainer: React.FC = () => {
	const { fetchTodos, isLoading, error } = useTodoStore();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<TodoForm />
			<TodoList />
		</div>
	);
};
