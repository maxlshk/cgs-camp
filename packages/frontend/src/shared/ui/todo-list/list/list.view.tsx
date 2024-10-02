import React, { useRef } from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { listStyles } from './list.styles';
import { useTodoStore } from '~store/todo.store';

export const ListView: React.FC = () => {
	const listRef = useRef<HTMLDivElement>(null);
	const { todos } = useTodoStore();

	return (
		<>
			<div className={listStyles} ref={listRef}>
				{todos.map((todo) => (
					<TodoElement todo={todo} view="list" key={todo.id} />
				))}
			</div>
		</>
	);
};
