import React from 'react';
import { TodoElement } from '../../../TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.type';
import {
	tableStyles,
	headerStyles,
	paginationStyles,
} from './TableView.styles';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { useFilterStore } from '~store/filter.store';

interface TableViewProps {
	todos: Todo[];
	userId: number;
	handlePageChange: (newPage: number) => void;
}

export const TableView: React.FC<TableViewProps> = ({
	todos,
	userId,
	handlePageChange,
}) => {
	const { pagination } = useFilterStore();

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
						editable={todo.userId === userId}
					/>
				))}
			</div>
			<ButtonGroup className={paginationStyles}>
				{[...Array(pagination.totalPages)].map((_, index) => (
					<Button
						key={index}
						onClick={() => handlePageChange(index + 1)}
						active={pagination.page === index + 1}
					>
						{index + 1}
					</Button>
				))}
			</ButtonGroup>
		</>
	);
};
