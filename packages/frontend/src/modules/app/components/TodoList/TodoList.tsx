import React from 'react';
import { TodoElement } from '../TodoItem/TodoItem';
import { useTodoStore } from '../../../../store/todo.store';
import {
	emptyStateStyles,
	headerStyles,
	listStyles,
	sliderStyles,
	tableStyles,
} from './TodoList.styles';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';

interface TodoListProps {
	filter: string;
}

export const TodoList: React.FC<TodoListProps> = ({ filter }) => {
	const todos = useTodoStore((state) => state.todos);
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}
	const filteredTodos = todos.filter((todo) => {
		if (filter === 'ALL') {
			return true;
		}
		if (filter === 'PRIVATE') {
			return !todo.public;
		}
		if (filter === 'PUBLIC') {
			return todo.public;
		}
		if (filter === 'COMPLETED') {
			return todo.completed;
		}
		return true;
	});

	if (isDesktop) {
		return (
			<div className={tableStyles}>
				<div className={headerStyles}>
					<span>Title</span>
					<span>Description</span>
					<span>Actions</span>
				</div>
				{filteredTodos.map((todo) => (
					<TodoElement key={todo.id} todo={todo} view="table" />
				))}
			</div>
		);
	}

	if (isTablet) {
		return (
			<div className={sliderStyles}>
				{filteredTodos.map((todo) => (
					<TodoElement key={todo.id} todo={todo} view="card" />
				))}
			</div>
		);
	}

	return (
		<div className={listStyles}>
			{filteredTodos.map((todo) => (
				<TodoElement key={todo.id} todo={todo} view="list" />
			))}
		</div>
	);
};
