import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { searchFormStyles } from './search.styles';

interface SearchProps {
	updateFilters: (filterType: string, value: string | null) => void;
	defaultValue?: string;
	placeholder: string;
}

export const Search = ({
	updateFilters,
	defaultValue,
	placeholder,
}: SearchProps): React.ReactElement => {
	const [searchInput, setSearchInput] = useState(defaultValue || '');

	const handleSearch = (e: React.FormEvent): void => {
		e.preventDefault();
		updateFilters('search', searchInput);
	};

	return (
		<form onSubmit={handleSearch} className={searchFormStyles}>
			<InputGroup
				type="text"
				placeholder={placeholder}
				value={searchInput}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setSearchInput(e.target.value)
				}
				rightElement={
					<Button type="submit" icon="search" minimal={true} />
				}
			/>
		</form>
	);
};
