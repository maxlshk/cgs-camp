import React, { useEffect } from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { buttonGroup } from './TodosPage.styles';
import { FILTER_TYPES } from '~shared/keys';
import { useUserStore } from '~store/user.store';

export const TodosPage: React.FC = () => {
	const {
		fetchTodos,
		isLoading: todoLoading,
		error: todoError,
	} = useTodoStore();
	const {
		getUser,
		isLoading: userLoading,
		error: userError,
	} = useUserStore();
	const [filter, setFilter] = React.useState<FILTER_TYPES>(FILTER_TYPES.ALL);

	useEffect(() => {
		fetchTodos();
		getUser();
	}, [fetchTodos, getUser]);

	if (todoLoading || userLoading) {
		return <div>Loading...</div>;
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<ButtonGroup className={buttonGroup}>
				<Button
					icon="globe"
					onClick={() => setFilter(FILTER_TYPES.ALL)}
					active={filter === FILTER_TYPES.ALL}
				>
					All
				</Button>
				<Button
					icon="person"
					onClick={() => setFilter(FILTER_TYPES.PRIVATE)}
					active={filter === FILTER_TYPES.PRIVATE}
				>
					Private
				</Button>
				<Button
					icon="people"
					onClick={() => setFilter(FILTER_TYPES.PUBLIC)}
					active={filter === FILTER_TYPES.PUBLIC}
				>
					Public
				</Button>
				<Button
					icon="tick"
					onClick={() => setFilter(FILTER_TYPES.COMPLETED)}
					active={filter === FILTER_TYPES.COMPLETED}
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
