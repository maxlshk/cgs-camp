import React from 'react';
import {
	inputStyles,
	textareaStyles,
	errorMessageStyles,
} from './textinput.styles';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../form/form.component';

interface FormFieldProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
	type?: 'input' | 'textarea';
	inputType?: string;
	error?: FieldError;
	minLength?: number;
	maxLength?: number;
}

export const TextInput: React.FC<FormFieldProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
	type = 'input',
	inputType = 'text',
	error,
	minLength,
	maxLength,
}) => {
	const sharedProps = {
		className: type === 'input' ? inputStyles : textareaStyles,
		...register(`${name}`, {
			required: required ? 'This field is required' : false,
			minLength: minLength
				? {
						value: minLength,
						message: `Minimum length is ${minLength} characters`,
					}
				: undefined,
			maxLength: maxLength
				? {
						value: maxLength,
						message: `Maximum length is ${maxLength} characters`,
					}
				: undefined,
		}),
		placeholder,
		defaultValue: defaultValue || '',
	};

	return (
		<div>
			{type === 'textarea' ? (
				<textarea {...sharedProps} />
			) : (
				<input type={inputType} {...sharedProps} />
			)}
			{error && (
				<span className={errorMessageStyles}>{error.message}</span>
			)}
		</div>
	);
};
