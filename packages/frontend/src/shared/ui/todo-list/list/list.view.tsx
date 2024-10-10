import React, { useRef } from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { listStyles, paginationControlsStyles } from './list.styles';
import { useTodoStore } from '~store/todo.store';
import { Button } from '@blueprintjs/core';
import { useFilters } from '~shared/hooks/useFilters';

interface ListViewProps {
	userId: number;
}

export const ListView: React.FC<ListViewProps> = ({ userId }) => {
	const listRef = useRef<HTMLDivElement>(null);
	const { todos, pagination } = useTodoStore();
	const { updateFilters } = useFilters();

	return (
		<>
			<div className={listStyles} ref={listRef}>
				{todos.map((todo) => (
					<TodoElement
						todo={todo}
						view="list"
						editable={todo.userId === userId}
						key={todo.id}
					/>
				))}
			</div>
			<div className={paginationControlsStyles}>
				<Button
					onClick={() =>
						updateFilters('page', (pagination.page + 1).toString())
					}
					disabled={pagination.page === pagination.totalPages}
				>
					Load More
				</Button>
			</div>
		</>
	);
};
