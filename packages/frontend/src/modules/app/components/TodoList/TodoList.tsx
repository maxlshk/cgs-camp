import React from 'react';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { useFilterStore } from '~store/filter.store';
import { emptyStateStyles } from './TodoList.styles';
import { CarouselView } from './TodoListViews/CarouselView/CarouselView';
import { ListView } from './TodoListViews/ListView/ListView';
import { TableView } from './TodoListViews/TableView/TableView';
import { DisplayType } from '~shared/types/display.type';

interface TodoListProps {
	displayType: DisplayType;
	handlePageChange: (newPage: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
	displayType,
	handlePageChange,
}) => {
	const { todos, fetchTodos } = useTodoStore();
	const user = useUserStore((state) => state.user);
	const { pagination, setPagination } = useFilterStore();

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const handleLoadMore = (): void => {
		if (pagination.page < pagination.totalPages) {
			setPagination({ pageSize: pagination.pageSize + 3 });
			fetchTodos();
		}
	};

	const hasMoreTodos = pagination.page < pagination.totalPages;

	const viewComponents = {
		[DisplayType.DESKTOP]: (
			<TableView
				todos={todos}
				userId={user.id}
				handlePageChange={handlePageChange}
			/>
		),
		[DisplayType.TABLET]: (
			<CarouselView
				todos={todos}
				userId={user.id}
				onLoadMore={handleLoadMore}
				hasMoreTodos={hasMoreTodos}
			/>
		),
		[DisplayType.PHONE]: (
			<ListView
				todos={todos}
				userId={user.id}
				onLoadMore={handleLoadMore}
				hasMoreTodos={hasMoreTodos}
			/>
		),
	};

	return viewComponents[displayType];
};
