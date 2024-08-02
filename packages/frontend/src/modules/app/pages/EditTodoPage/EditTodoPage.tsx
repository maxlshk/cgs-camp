import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormData } from '~shared/components/form/form.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from '../NewTodoPage/NewTodoPage.styles';

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
			<TextInput
				name="title"
				register={register}
				placeholder="Title"
				defaultValue={todo.title}
				type="input"
				required
			/>
			<TextInput
				name="description"
				register={register}
				placeholder="Description"
				defaultValue={todo.description}
				type="textarea"
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
