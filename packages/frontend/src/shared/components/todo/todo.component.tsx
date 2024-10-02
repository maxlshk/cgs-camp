import * as React from 'react';
import { Todo as TodoType, ViewType } from '~types/todo.type';
import { useTodoStore } from '~store/todo.store';
import { cardStyles, listItemStyles, tableRowStyles } from './todo.styles';
import { Button, Switch, Intent } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

interface TodoElementProps {
	todo: TodoType;
	view: ViewType;
}

export const Todo: React.FC<TodoElementProps> = ({ todo, view }) => {
	const { updateTodo, deleteTodo } = useTodoStore();
	const navigator = useNavigate();

	const handleComplete = (): void => {
		const { id, ...rest } = todo;
		updateTodo(id, { ...rest, isCompleted: !todo.isCompleted });
	};

	const handleDelete = (): Promise<void> => deleteTodo(todo.id);

	const handleEdit = (): void => {
		navigator(ROUTER_KEYS.EDIT.replace(':id', todo.id.toString()));
	};

	const renderActions = (): React.JSX.Element => (
		<>
			<Switch
				checked={todo.isCompleted}
				onChange={handleComplete}
				label={todo.isCompleted ? 'Completed' : 'Not Completed'}
			/>
			<div>
				<Button intent={Intent.PRIMARY} onClick={handleEdit}>
					Edit
				</Button>
				<Button intent={Intent.DANGER} onClick={handleDelete}>
					Delete
				</Button>
			</div>
		</>
	);

	if (view === 'table') {
		return (
			<div className={tableRowStyles}>
				<span>{todo.title}</span>
				<span>{todo.description}</span>
				<span>
					<div>{renderActions()}</div>
				</span>
			</div>
		);
	}

	if (view === 'card') {
		return (
			<div className={cardStyles}>
				<h3>{todo.title}</h3>
				<p>{todo.description}</p>
				{renderActions()}
			</div>
		);
	}

	return (
		<div className={listItemStyles}>
			<div>
				<h3>{todo.title}</h3>
				<p>{todo.description}</p>
			</div>
			{renderActions()}
		</div>
	);
};
