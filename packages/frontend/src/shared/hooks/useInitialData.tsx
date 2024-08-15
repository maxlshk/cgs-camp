import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilterStore } from '~store/filter.store';
import { useUserStore } from '~store/user.store';
import { useTodoStore } from '~store/todo.store';

export const useInitialData = (): void => {
	const location = useLocation();
	const { setFilters, setPagination } = useFilterStore();
	const { getUser } = useUserStore();
	const { fetchTodos } = useTodoStore();

	const loadInitialData = useCallback(async () => {
		const searchParams = new URLSearchParams(location.search);
		const isPublic = searchParams.get('public');
		setFilters({
			public: isPublic ? /true/.test(isPublic) : undefined,
			status: searchParams.get('status') as
				| 'completed'
				| 'active'
				| undefined,
			search: searchParams.get('search') || undefined,
		});

		setPagination({ page: parseInt(searchParams.get('page') || '1') });
		await Promise.all([fetchTodos(), getUser()]);
	}, [location.search, setFilters, setPagination]);

	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);
};
