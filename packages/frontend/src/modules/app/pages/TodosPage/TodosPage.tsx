import React, { useEffect } from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { buttonGroup } from './TodosPage.styles';

enum TodoFilter {
	ALL = 'ALL',
	PRIVATE = 'PRIVATE',
	PUBLIC = 'PUBLIC',
	COMPLETED = 'COMPLETED',
}

export const TodosPage: React.FC = () => {
	const { fetchTodos, isLoading, error } = useTodoStore();
	const [filter, setFilter] = React.useState<TodoFilter>(TodoFilter.ALL);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<ButtonGroup large className={buttonGroup}>
				<Button
					icon="globe"
					onClick={() => setFilter(TodoFilter.ALL)}
					active={filter === TodoFilter.ALL}
				>
					All
				</Button>
				<Button
					icon="person"
					onClick={() => setFilter(TodoFilter.PRIVATE)}
					active={filter === TodoFilter.PRIVATE}
				>
					Private
				</Button>
				<Button
					icon="people"
					onClick={() => setFilter(TodoFilter.PUBLIC)}
					active={filter === TodoFilter.PUBLIC}
				>
					Public
				</Button>
				<Button
					icon="tick"
					onClick={() => setFilter(TodoFilter.COMPLETED)}
					active={filter === TodoFilter.COMPLETED}
				>
					Completed
				</Button>
			</ButtonGroup>
			<div>
				<TodoList filter={filter} />
			</div>
		</div>
	);
};
