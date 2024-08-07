import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { ButtonGroup, Button, Spinner } from '@blueprintjs/core';
import { buttonGroup } from './TodosPage.styles';

export const TodosPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		todos,
		fetchTodos,
		isLoading: todoLoading,
		error: todoError,
	} = useTodoStore();
	const {
		user,
		getUser,
		error: userError,
		isLoading: userLoading,
	} = useUserStore();

	const searchParams = new URLSearchParams(location.search);
	const currentFilters = {
		public: searchParams.get('public'),
		status: searchParams.get('status'),
	};

	useEffect(() => {
		const loadInitialData = async (): Promise<void> => {
			await Promise.all([
				fetchTodos({
					public:
						currentFilters.public === 'true'
							? true
							: currentFilters.public === 'false'
								? false
								: undefined,
					status: currentFilters.status as
						| 'completed'
						| 'active'
						| undefined,
				}),
				getUser(),
			]);
		};

		loadInitialData();
	}, [fetchTodos, getUser, location.search]);

	const updateFilters = (
		filterType: 'public' | 'status',
		value: string | null,
	): void => {
		const updatedFilters = { ...currentFilters };

		if (filterType === 'public') {
			updatedFilters.public =
				updatedFilters.public === value ? null : value;
		} else if (filterType === 'status') {
			updatedFilters.status =
				updatedFilters.status === value ? null : value;
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

	if (!user || !todos) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Spinner size={50} />
			</div>
		);
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<ButtonGroup className={buttonGroup}>
				<Button
					icon="person"
					onClick={() => updateFilters('public', 'false')}
					active={currentFilters.public === 'false'}
				>
					Private
				</Button>
				<Button
					icon="people"
					onClick={() => updateFilters('public', 'true')}
					active={currentFilters.public === 'true'}
				>
					Public
				</Button>
				<Button
					icon="tick"
					onClick={() => updateFilters('status', 'completed')}
					active={currentFilters.status === 'completed'}
				>
					Completed
				</Button>
				<Button
					icon="cross"
					onClick={() => updateFilters('status', 'active')}
					active={currentFilters.status === 'active'}
				>
					Active
				</Button>
			</ButtonGroup>
			<div>
				{todoLoading || userLoading ? (
					<Spinner size={20} />
				) : (
					<TodoList />
				)}
			</div>
		</div>
	);
};
