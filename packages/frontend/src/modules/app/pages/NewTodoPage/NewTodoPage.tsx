import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormData } from '~shared/components/form/form.component';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from './NewTodoPage.styles';

export const NewTodoPage: React.FC = () => {
	const navigate = useNavigate();
	const { handleSubmit, reset, register } = useForm<FormData>();
	const addTodo = useTodoStore((state) => state.addTodo);

	const onSubmit = (data: FormData): void => {
		addTodo(data);
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
				type="input"
				required
			/>
			<TextInput
				name="description"
				register={register}
				placeholder="Description"
				type="textarea"
				required
			/>
			<div className={checkboxContainerStyles}>
				<CheckBox
					name="completed"
					register={register}
					label="Completed"
					checked={false}
				/>
				<CheckBox
					name="public"
					register={register}
					label="Public"
					checked={false}
				/>
			</div>
		</Form>
	);
};
