import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormData } from '~shared/components/form/form.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from '../NewTodoPage/NewTodoPage.styles';
import { ROUTER_KEYS } from '~shared/keys';

export const EditTodoForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<FormData>();
	const { todos, updateTodo } = useTodoStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const todo = todos.find((todo) => todo.id === Number(id));

	const onSubmit = async (data: FormData): Promise<void> => {
		try {
			await updateTodo(Number(id), data);

			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the todo.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Create new todo'}
			submitError={submitError}
		>
			<TextInput
				name="title"
				register={register}
				placeholder="Title"
				defaultValue={todo.title}
				type="input"
				required
				error={errors.title}
				minLength={3}
				maxLength={50}
			/>
			<TextInput
				name="description"
				register={register}
				placeholder="Description"
				defaultValue={todo.description}
				type="textarea"
				required
				error={errors.description}
				minLength={10}
				maxLength={500}
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