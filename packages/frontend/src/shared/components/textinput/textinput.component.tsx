import React from 'react';
import { inputStyles, textareaStyles } from './textinput.styles';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { FormData } from '../form/form.component';

interface FormFieldProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
	type?: 'input' | 'textarea';
	inputType?: string;
}

export const TextInput: React.FC<FormFieldProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
	type = 'input',
	inputType = 'text',
}) => {
	const sharedProps = {
		className: type === 'input' ? inputStyles : textareaStyles,
		...register(`${name}`, { required: required }),
		placeholder,
		defaultValue: defaultValue || '',
	};

	if (type === 'textarea') {
		return <textarea {...sharedProps} />;
	}

	return <input type={inputType} {...sharedProps} />;
};
