import React from 'react';
import { labelStyles, checkboxStyles } from './checkbox.styles';
import { UseFormRegister, Path } from 'react-hook-form';

interface CheckBoxProps<T extends Record<string, unknown>> {
	name: Path<T>;
	register: UseFormRegister<T>;
	label: string;
	checked: boolean;
}

export const CheckBox = <T extends Record<string, unknown>>({
	name,
	register,
	label,
	checked,
}: CheckBoxProps<T>): React.ReactElement => {
	return (
		<label className={labelStyles}>
			<input
				className={checkboxStyles}
				{...register(name)}
				type="checkbox"
				defaultChecked={checked}
			/>
			{label}
		</label>
	);
};
