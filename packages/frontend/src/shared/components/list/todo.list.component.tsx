import React from 'react';
import { TodoElement } from '../todo/todo.component';
import { useTodoStore } from '../../../store/todo.store';

export const TodoList: React.FC = () => {
	const todos = useTodoStore((state) => state.todos);

	if (todos.length === 0) {
		return <div>No todos found. Add a new one!</div>;
	}

	return (
		<div>
			{todos.map((todo) => (
				<TodoElement key={todo.id} todo={todo} />
			))}
		</div>
	);
};
