import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { EditUser } from '~shared/types/editUser.type';
import { useUserStore } from '~store/user.store';

export const NewTodoPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<EditUser>();
	const { user } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: EditUser): Promise<void> => {
		if (data.password !== data.repeatPassword) {
			setSubmitError('Passwords do not match');
			return;
		}
		try {
			// await addTodo(data);
			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the user.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Edit Profile'}
			submitError={submitError}
		>
			<TextInput
				name="name"
				register={register}
				placeholder="Name"
				required
				defaultValue={user.name}
				error={errors.name}
				minLength={3}
				maxLength={50}
			/>
			<TextInput
				name="password"
				register={register}
				placeholder="Password"
				required={false}
				error={errors.password}
				minLength={6}
				maxLength={25}
			/>
			<TextInput
				name="repeatPassword"
				register={register}
				placeholder="Repeat Password"
				required={false}
				error={errors.repeatPassword}
				minLength={6}
				maxLength={25}
			/>
		</Form>
	);
};
