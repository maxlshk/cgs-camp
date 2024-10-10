import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
	filterUpdateFunction,
	todoFilters,
} from '~shared/types/todo-filters.type';

export const useFilters = (): {
	currentFilters: todoFilters;
	updateFilters: filterUpdateFunction;
	resetFilters: () => void;
} => {
	const navigate = useNavigate();
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);

	const currentFilters = useMemo(
		() => ({
			private: searchParams.get('private'),
			status: searchParams.get('status'),
			page: searchParams.get('page') || '1',
			search: searchParams.get('search') || '',
		}),
		[location.search],
	);

	const updateFilters = (
		filterType: keyof todoFilters,
		value: string | null,
	): void => {
		const updatedFilters = { ...currentFilters };

		if (filterType === 'search') {
			updatedFilters[filterType] = value || '';
		} else {
			updatedFilters[filterType] =
				updatedFilters[filterType] === value ? null : value;
		}

		const updatedParams = new URLSearchParams();
		Object.entries(updatedFilters).forEach(([key, val]) => {
			if (val !== null && val !== undefined && val !== '') {
				updatedParams.set(key, val);
			}
		});

		const queryString = updatedParams.toString();
		navigate(queryString ? `?${queryString}` : '');
	};

	const resetFilters = (): void => {
		navigate('');
	};

	return {
		currentFilters,
		updateFilters,
		resetFilters,
	};
};
