import React from 'react';
import { useForm } from 'react-hook-form';
import { useTodoStore } from '../../../store/todo.store';
import { useNavigate, useParams } from 'react-router-dom';
import {
	formContainerStyles,
	formStyles,
	titleStyles,
	inputStyles,
	textareaStyles,
	checkboxContainerStyles,
	labelStyles,
	checkboxStyles,
	buttonStyles,
} from './todo.form.styles';

interface TodoFormData {
	title: string;
	description: string;
	completed: boolean;
	public: boolean;
}

export const TodoForm: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string | null }>();
	const { register, handleSubmit, reset } = useForm<TodoFormData>();
	const { todos, addTodo, updateTodo } = useTodoStore();

	const isEditMode = !!id;
	let currentTodo = null;
	if (isEditMode) {
		currentTodo = todos.find((todo) => todo.id === Number(id));
	}

	const onSubmit = (data: TodoFormData): void => {
		if (isEditMode) {
			updateTodo(Number(id), data);
		} else {
			addTodo(data);
		}
		reset();
		navigate('/todo');
	};

	return (
		<div className={formContainerStyles}>
			<form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={titleStyles}>Create New Todo</h2>
				<input
					className={inputStyles}
					{...register('title', { required: true })}
					placeholder="Title"
					defaultValue={currentTodo?.title}
				/>
				<textarea
					className={textareaStyles}
					{...register('description')}
					placeholder="Description"
					defaultValue={currentTodo?.description}
				/>
				<div className={checkboxContainerStyles}>
					<label className={labelStyles}>
						<input
							className={checkboxStyles}
							{...register('completed')}
							type="checkbox"
							defaultChecked={currentTodo?.completed || false}
						/>
						Completed
					</label>
					<label className={labelStyles}>
						<input
							className={checkboxStyles}
							{...register('public')}
							type="checkbox"
							defaultChecked={currentTodo?.public || false}
						/>
						Public
					</label>
				</div>
				<button className={buttonStyles} type="submit">
					{isEditMode ? 'Update todo' : 'Add todo'}
				</button>
			</form>
		</div>
	);
};
