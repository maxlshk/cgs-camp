import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import {
	formContainerStyles,
	formStyles,
	titleStyles,
	buttonStyles,
} from './todo.form.styles';
import { Todo } from '~shared/services/types';
import { Button } from '@blueprintjs/core';

export interface FormData extends Omit<Todo, 'id'> {}
interface FormProps {
	handleSubmit: UseFormHandleSubmit<FormData, undefined>;
	onSubmit: (data: FormData) => void;
	title: string;
	children?: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
	handleSubmit,
	onSubmit,
	title,
	children,
}) => {
	return (
		<div className={formContainerStyles}>
			<form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={titleStyles}>{title}</h2>
				{children}
				<Button className={buttonStyles} type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
};
