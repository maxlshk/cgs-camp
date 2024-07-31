import React from 'react';
import { useForm } from 'react-hook-form';
import { useTodoStore } from '../../../store/todo.store';

interface TodoFormData {
	title: string;
	description: string;
	completed: boolean;
	public: boolean;
}

export const TodoForm: React.FC = () => {
	const { register, handleSubmit, reset } = useForm<TodoFormData>();
	const addTodo = useTodoStore((state) => state.addTodo);

	const onSubmit = (data: TodoFormData): void => {
		addTodo(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('title', { required: true })}
				placeholder="Title"
			/>
			<input {...register('description')} placeholder="Description" />
			<button type="submit">Add Todo</button>
		</form>
	);
};
