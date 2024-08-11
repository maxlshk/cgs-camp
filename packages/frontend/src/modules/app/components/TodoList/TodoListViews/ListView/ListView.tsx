import React, { useEffect, useRef } from 'react';
import { TodoElement } from '../../../TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.type';
import { Button } from '@blueprintjs/core';
import { listStyles, paginationControlsStyles } from './ListView.styles';
import { useFilterStore } from '~store/filter.store';

interface ListViewProps {
	todos: Todo[];
	userId: number;
	onLoadMore: () => void;
	hasMoreTodos: boolean;
}

export const ListView: React.FC<ListViewProps> = ({
	todos,
	userId,
	onLoadMore,
	hasMoreTodos,
}) => {
	const listRef = useRef<HTMLDivElement>(null);
	const { lastViewedIndex, setLastViewedIndex } = useFilterStore();

	useEffect(() => {
		const scrollToStoredIndex = (): void => {
			if (listRef.current) {
				const index = lastViewedIndex;
				if (index < todos.length) {
					const todoElement = listRef.current.children[
						index
					] as HTMLElement;
					if (todoElement) {
						todoElement.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
					}
				}
			}
		};

		scrollToStoredIndex();
	}, [todos, lastViewedIndex]);

	const handleLoadMore = (): void => {
		onLoadMore();
		setLastViewedIndex(todos.length - 1);
	};

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
				<Button onClick={handleLoadMore} disabled={!hasMoreTodos}>
					Load More
				</Button>
			</div>
		</>
	);
};
