import React from 'react';
import { useTodoStore } from '~/store/todo.store';
import { CarouselView } from './carousel/carousel.view';
import { ListView } from './list/list.view';
import { TableView } from './table/table.view';
import { emptyStateStyles } from './todo-list.styles';
import { DisplayType } from '~shared/types/display.type';
import { useUserStore } from '~store/user.store';

interface TodoListProps {
	displayType: DisplayType;
}

export const TodoList: React.FC<TodoListProps> = ({ displayType }) => {
	const { todos } = useTodoStore();
	const { user } = useUserStore();

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const viewComponents = {
		[DisplayType.DESKTOP]: <TableView userId={user.id} />,
		[DisplayType.TABLET]: <CarouselView userId={user.id} />,
		[DisplayType.PHONE]: <ListView userId={user.id} />,
	};

	return viewComponents[displayType];
};
