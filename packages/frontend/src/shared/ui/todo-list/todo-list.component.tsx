import React from 'react';
import { useTodoStore } from '~/store/todo.store';
import { Carousel } from './carousel/carousel.view';
import { ListView } from './list/list.view';
import { TableView } from './table/table.view';
import { emptyStateStyles } from './todo-list.styles';
import { DisplayType } from '~shared/types/display.type';

interface TodoListProps {
	displayType: DisplayType;
}

export const TodoList: React.FC<TodoListProps> = ({ displayType }) => {
	const { todos } = useTodoStore();

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const viewComponents = {
		[DisplayType.DESKTOP]: <TableView />,
		[DisplayType.TABLET]: <Carousel />,
		[DisplayType.PHONE]: <ListView />,
	};

	return viewComponents[displayType];
};
