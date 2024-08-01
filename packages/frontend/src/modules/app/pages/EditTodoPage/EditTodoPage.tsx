import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormData } from '~shared/components/form/form.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { Input } from '~shared/components/input/input.component';
import { TextArea } from '~shared/components/textarea/textarea.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from './EditTodoPage.style';

export const EditTodoForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { handleSubmit, reset, register } = useForm<FormData>();
	const { todos, updateTodo } = useTodoStore();

	const todo = todos.find((todo) => todo.id === Number(id));

	const onSubmit = (data: FormData): void => {
		console.log('edit data', data);
		updateTodo(Number(id), data);
		reset();
		navigate('/todos');
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Create new todo'}
		>
			<Input
				name="title"
				register={register}
				placeholder="Title"
				defaultValue={todo.title}
				required
			/>
			<TextArea
				name="description"
				register={register}
				placeholder="Description"
				defaultValue={todo.description}
				required
			/>
			<div className={checkboxContainerStyles}>
				<CheckBox
					name="completed"
					register={register}
					label="Completed"
					checked={todo.completed}
				/>
				<CheckBox
					name="public"
					register={register}
					label="Public"
					checked={todo.public}
				/>
			</div>
		</Form>
	);
};
