import React from 'react';
import { inputStyles } from './input.styles';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { FormData } from '../form/form.component';

interface InputProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
}

export const Input: React.FC<InputProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
}) => {
	return (
		<input
			className={inputStyles}
			{...register(`${name}`, { required: required })}
			placeholder={placeholder}
			defaultValue={defaultValue || ''}
		/>
	);
};
