import React, { useRef, useEffect } from 'react';
import { TodoElement } from '../TodoItem/TodoItem';
import { useTodoStore } from '~store/todo.store';
import {
	emptyStateStyles,
	headerStyles,
	listStyles,
	sliderStyles,
	tableStyles,
	paginationControlsStyles,
} from './TodoList.styles';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { ViewType } from '~shared/types/view.type';
import { useUserStore } from '~store/user.store';
import { Button } from '@blueprintjs/core';

export const TodoList: React.FC = () => {
	const { todos, pagination, fetchTodos } = useTodoStore();
	const user = useUserStore((state) => state.user);
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = (): void => {
			if (listRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } =
					listRef.current;
				if (scrollLeft + clientWidth >= scrollWidth - 1) {
					if (pagination.page < pagination.totalPages) {
						fetchTodos(undefined, pagination.page + 1);
					}
				}
			}
		};

		if (isTablet && listRef.current) {
			listRef.current.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (listRef.current) {
				listRef.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, [isTablet, pagination, fetchTodos]);

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const viewStyles: Record<ViewType, string> = {
		table: tableStyles,
		card: sliderStyles,
		list: listStyles,
	};

	const getViewType = (): ViewType => {
		if (isDesktop) return 'table';
		if (isTablet) return 'card';
		return 'list';
	};

	const viewType = getViewType();

	const handleLoadMore = (): void => {
		if (pagination.page < pagination.totalPages) {
			fetchTodos(undefined, pagination.page + 1);
		}
	};

	return (
		<>
			<div className={viewStyles[viewType]} ref={listRef}>
				{viewType === 'table' && (
					<div className={headerStyles}>
						<span>Title</span>
						<span>Description</span>
						<span>Actions</span>
					</div>
				)}
				{todos.map((todo) => (
					<TodoElement
						key={todo.id}
						todo={todo}
						view={viewType}
						editable={todo.userId === user.id}
					/>
				))}
			</div>
			{!isDesktop && !isTablet && (
				<div className={paginationControlsStyles}>
					<Button
						onClick={handleLoadMore}
						disabled={pagination.page >= pagination.totalPages}
					>
						Load More
					</Button>
				</div>
			)}
		</>
	);
};
