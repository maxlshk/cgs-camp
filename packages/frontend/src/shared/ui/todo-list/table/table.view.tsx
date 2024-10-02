import React from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { tableStyles, headerStyles } from './table.styles';
import { useTodoStore } from '~store/todo.store';

export const TableView: React.FC = () => {
	const { todos } = useTodoStore();

	return (
		<>
			<div className={tableStyles}>
				<div className={headerStyles}>
					<span>Title</span>
					<span>Description</span>
					<span>Actions</span>
				</div>
				{todos.map((todo) => (
					<TodoElement key={todo.id} todo={todo} view="table" />
				))}
			</div>
		</>
	);
};
