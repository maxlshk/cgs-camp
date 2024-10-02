import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { TextArea } from '~shared/components/textarea/textarea.component';
import { checkboxContainerStyles } from './todo-form.styles';
import { Todo } from '~shared/types/todo.type';

interface TodoFormProps {
	initialValues?: Omit<Todo, 'id'>;
	onSubmit: (data: Omit<Todo, 'id'>) => Promise<void>;
	submitError?: string;
	formTitle: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({
	initialValues = {
		title: '',
		description: '',
		isCompleted: false,
		isPrivate: false,
	},
	onSubmit,
	submitError,
	formTitle,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<Omit<Todo, 'id'>>();

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={async (data) => {
				await onSubmit(data);
			}}
			title={formTitle}
			submitError={submitError}
		>
			<TextInput
				name="title"
				register={register}
				placeholder="Title"
				required
				error={errors.title}
				minLength={3}
				maxLength={50}
				defaultValue={initialValues?.title || ''}
			/>
			<TextArea
				name="description"
				register={register}
				placeholder="Description"
				required
				error={errors.description}
				minLength={10}
				maxLength={500}
				defaultValue={initialValues?.description || ''}
			/>
			<div className={checkboxContainerStyles}>
				<CheckBox
					name="isCompleted"
					register={register}
					label="Completed"
					checked={initialValues?.isCompleted || false}
				/>
				<CheckBox
					name="isPrivate"
					register={register}
					label="Private"
					checked={initialValues?.isPrivate || false}
				/>
			</div>
		</Form>
	);
};
