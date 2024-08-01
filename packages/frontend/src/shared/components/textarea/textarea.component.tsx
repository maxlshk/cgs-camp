import React from 'react';
import { textareaStyles } from './textarea.styles';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { FormData } from '../form/form.component';

interface TextAreaProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
}) => {
	return (
		<textarea
			className={textareaStyles}
			{...register(`${name}`, { required: required })}
			placeholder={placeholder}
			defaultValue={defaultValue || ''}
		/>
	);
};
