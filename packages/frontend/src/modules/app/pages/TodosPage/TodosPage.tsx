import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { useFilterStore } from '~store/filter.store';
import { ButtonGroup, Button, Spinner, InputGroup } from '@blueprintjs/core';
import { useSwitchDisplay } from '~shared/hooks/useSwitchDisplay';
import {
	buttonGroup,
	paginationStyles,
	searchFormStyles,
	spinnerStyles,
	todosContainerStyles,
} from './TodosPage.styles';
import { useInitialData } from '~shared/hooks/useInitialData';
import { DisplayType } from '~shared/types/display.type';

export const TodosPage: React.FC = () => {
	const navigate = useNavigate();
	const { todos, isLoading: todoLoading, error: todoError } = useTodoStore();
	const { user, error: userError, isLoading: userLoading } = useUserStore();
	const { filters, pagination } = useFilterStore();
	const { displayType } = useSwitchDisplay();

	useInitialData();

	const [searchInput, setSearchInput] = useState(filters.search || '');

	const updateFilters = (
		filterType: keyof typeof filters | 'page',
		value: string | null,
	): void => {
		const updatedFilters = { ...filters, [filterType]: value };
		const updatedParams = new URLSearchParams();
		Object.entries(updatedFilters).forEach(([key, val]) => {
			if (val !== null && val !== undefined && val !== '') {
				updatedParams.set(key, val.toString());
			}
		});
		const queryString = updatedParams.toString();
		navigate(queryString ? `?${queryString}` : '');
	};

	const handleSearch = (e: React.FormEvent): void => {
		e.preventDefault();
		updateFilters('search', searchInput);
	};

	const handlePageChange = (newPage: number): void => {
		updateFilters('page', newPage.toString());
	};

	if (!user || !todos) {
		return (
			<div className={spinnerStyles}>
				<Spinner size={50} />
			</div>
		);
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<form onSubmit={handleSearch} className={searchFormStyles}>
				<InputGroup
					type="text"
					placeholder="Search todos..."
					value={searchInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearchInput(e.target.value)
					}
					rightElement={
						<Button type="submit" icon="search" minimal={true} />
					}
				/>
			</form>
			<ButtonGroup className={buttonGroup}>
				<Button
					icon={
						displayType === DisplayType.PHONE ? undefined : 'lock'
					}
					onClick={() =>
						updateFilters(
							'public',
							filters.public === false ? null : 'false',
						)
					}
					active={filters.public === false}
				>
					Private
				</Button>
				<Button
					icon={
						displayType === DisplayType.PHONE ? undefined : 'people'
					}
					onClick={() =>
						updateFilters(
							'public',
							filters.public === true ? null : 'true',
						)
					}
					active={filters.public === true}
				>
					Public
				</Button>
				<Button
					icon={
						displayType === DisplayType.PHONE ? undefined : 'tick'
					}
					onClick={() =>
						updateFilters(
							'status',
							filters.status === 'completed' ? null : 'completed',
						)
					}
					active={filters.status === 'completed'}
				>
					Completed
				</Button>
				<Button
					icon={
						displayType === DisplayType.PHONE ? undefined : 'target'
					}
					onClick={() =>
						updateFilters(
							'status',
							filters.status === 'active' ? null : 'active',
						)
					}
					active={filters.status === 'active'}
				>
					Active
				</Button>
			</ButtonGroup>
			<div className={todosContainerStyles}>
				{todoLoading || userLoading ? (
					<Spinner size={20} />
				) : (
					<>
						<TodoList displayType={displayType} />
						{displayType === DisplayType.DESKTOP && (
							<ButtonGroup className={paginationStyles}>
								{[...Array(pagination.totalPages)].map(
									(_, index) => (
										<Button
											key={index}
											onClick={() =>
												handlePageChange(index + 1)
											}
											active={
												pagination.page === index + 1
											}
										>
											{index + 1}
										</Button>
									),
								)}
							</ButtonGroup>
						)}
					</>
				)}
			</div>
		</div>
	);
};
