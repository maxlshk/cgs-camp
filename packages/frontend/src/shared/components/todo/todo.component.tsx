// import * as React from 'react';
// import { Todo } from '../../../shared/services/types';
// import { useTodoStore } from '../../../store/todo.store';
// import { cardStyles, listItemStyles, tableRowStyles } from './todo.styles';
// import { Button, Switch, Intent } from '@blueprintjs/core';
// import { useNavigate } from 'react-router-dom';

// interface TodoElementProps {
// 	todo: Todo;
// 	view: 'table' | 'card' | 'list';
// }

// export const TodoElement: React.FC<TodoElementProps> = ({ todo, view }) => {
// 	const { updateTodo, deleteTodo } = useTodoStore();
// 	const navigator = useNavigate();

// 	const handleComplete = (): void => {
// 		const { id, ...rest } = todo;
// 		updateTodo(id, { ...rest, completed: !todo.completed });
// 	};

// 	const handleDelete = (): Promise<void> => deleteTodo(todo.id);

// 	const handleEdit = (): void => {
// 		navigator(`/todo/edit/${todo.id}`);
// 		console.log('Edit todo');
// 	};

// 	const renderActions = (): React.JSX.Element => (
// 		<>
// 			<Switch
// 				checked={todo.completed}
// 				onChange={handleComplete}
// 				label={todo.completed ? 'Completed' : 'Not Completed'}
// 			/>
// 			<div>
// 				<Button intent={Intent.PRIMARY} onClick={handleEdit}>
// 					Edit
// 				</Button>
// 				<Button intent={Intent.DANGER} onClick={handleDelete}>
// 					Delete
// 				</Button>
// 			</div>
// 		</>
// 	);

// 	if (view === 'table') {
// 		return (
// 			<div className={tableRowStyles}>
// 				<span>{todo.title}</span>
// 				<span>{todo.description}</span>
// 				<span>
// 					<div>{renderActions()}</div>
// 				</span>
// 			</div>
// 		);
// 	}

// 	if (view === 'card') {
// 		return (
// 			<div className={cardStyles}>
// 				<h3>{todo.title}</h3>
// 				<p>{todo.description}</p>
// 				{renderActions()}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className={listItemStyles}>
// 			<div>
// 				<h3>{todo.title}</h3>
// 				<p>{todo.description}</p>
// 			</div>
// 			{renderActions()}
// 		</div>
// 	);
// };
