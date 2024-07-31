import React from 'react';
import { Todo } from '../../../shared/services/types';
import { useTodoStore } from '../../../store/todo.store';

interface TodoElementProps {
	todo: Todo;
}

export const TodoElement: React.FC<TodoElementProps> = ({ todo }) => {
	const { updateTodo, deleteTodo } = useTodoStore();

	return (
		<div>
			<span>{todo.title}</span>
			<span>{todo.description}</span>
			<button
				onClick={() =>
					updateTodo(todo.id, { completed: !todo.completed })
				}
			>
				{todo.completed ? 'Undo' : 'Complete'}
			</button>
			<button onClick={() => deleteTodo(todo.id)}>Delete</button>
		</div>
	);
};
