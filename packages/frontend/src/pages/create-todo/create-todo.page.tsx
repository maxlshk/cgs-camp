import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~/store/todo.store';
import { ROUTER_KEYS } from '~shared/keys';
import { TodoForm } from '~shared/ui/todo-form/todo-form.component';
import { Todo } from '~shared/types/todo.type';

export const CreateTodoPage: React.FC = () => {
	const navigate = useNavigate();
	const addTodo = useTodoStore((state) => state.addTodo);
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: Omit<Todo, 'id'>): Promise<void> => {
		try {
			await addTodo(data);
			navigate(ROUTER_KEYS.DASHBOARD);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while adding the todo.',
			);
		}
	};

	return (
		<TodoForm
			onSubmit={onSubmit}
			formTitle="Create new todo"
			submitError={submitError}
		/>
	);
};
