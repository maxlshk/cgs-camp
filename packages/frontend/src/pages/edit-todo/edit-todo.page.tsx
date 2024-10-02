import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~/store/todo.store';
import { ROUTER_KEYS } from '~shared/keys';
import { TodoForm } from '~shared/ui/todo-form/todo-form.component';
import { Todo } from '~shared/types/todo.type';

export const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { todos, updateTodo } = useTodoStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const todo = todos.find((todo) => todo.id === Number(id));

	const onSubmit = async (data: Omit<Todo, 'id'>): Promise<void> => {
		try {
			await updateTodo(Number(id), data);
			navigate(ROUTER_KEYS.DASHBOARD);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the todo.',
			);
		}
	};

	return (
		<TodoForm
			initialValues={todo}
			onSubmit={onSubmit}
			formTitle="Edit todo"
			submitError={submitError}
		/>
	);
};
