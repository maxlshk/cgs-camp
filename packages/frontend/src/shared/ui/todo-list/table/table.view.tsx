import React from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { tableStyles, headerStyles, paginationStyles } from './table.styles';
import { useTodoStore } from '~store/todo.store';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { useFilters } from '~shared/hooks/useFilters';

interface TableViewProps {
	userId: number;
}

export const TableView: React.FC<TableViewProps> = ({ userId }) => {
	const { todos, pagination } = useTodoStore();
	const { updateFilters } = useFilters();

	return (
		<>
			<div className={tableStyles}>
				<div className={headerStyles}>
					<span>Title</span>
					<span>Description</span>
					<span>Actions</span>
				</div>
				{todos.map((todo) => (
					<TodoElement
						key={todo.id}
						todo={todo}
						view="table"
						editable={todo.userId == userId}
					/>
				))}
			</div>
			<ButtonGroup className={paginationStyles}>
				{[...Array(pagination.totalPages)].map((_, index) => (
					<Button
						key={index}
						onClick={() =>
							updateFilters('page', (index + 1).toString())
						}
						active={pagination.page === index + 1}
					>
						{index + 1}
					</Button>
				))}
			</ButtonGroup>
		</>
	);
};
