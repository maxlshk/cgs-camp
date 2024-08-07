import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';

interface Filters {
	public?: boolean;
	status?: 'completed' | 'active';
	search?: string;
}

export const useInitialData = (): void => {
	const location = useLocation();
	const { fetchTodos } = useTodoStore();
	const { getUser } = useUserStore();

	useEffect(() => {
		const loadInitialData = async (): Promise<void> => {
			const searchParams = new URLSearchParams(location.search);
			const currentFilters: Filters = {
				public:
					searchParams.get('public') === 'true'
						? true
						: searchParams.get('public') === 'false'
							? false
							: undefined,
				status: searchParams.get('status') as
					| 'completed'
					| 'active'
					| undefined,
				search: searchParams.get('search') || undefined,
			};

			await Promise.all([
				fetchTodos(
					currentFilters,
					parseInt(searchParams.get('page') || '1'),
					parseInt(searchParams.get('pageSize') || '10'),
				),
				getUser(),
			]);
		};

		loadInitialData();
	}, [fetchTodos, getUser, location.search]);
};
