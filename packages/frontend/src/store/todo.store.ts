import { create } from 'zustand';
import { Todo } from '../shared/types/todo.type';
import { todoService } from '~shared/services/todo.service';
import { Pagination } from '~shared/types/pagination.type';
import { todoFilters } from '~shared/types/todo-filters.type';

interface TodoState {
	todos: Todo[];
	pagination: Pagination;
	isLoading: boolean;
	error: string | null;
	fetchTodos: (
		filters?: Partial<todoFilters>,
		append?: boolean,
	) => Promise<void>;
	addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
	updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
	resetTodos: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	pagination: null,
	isLoading: false,
	error: null,
	fetchTodos: async (
		filters: Partial<todoFilters>,
		append = false,
	): Promise<void> => {
		set({ isLoading: true });
		try {
			const { todos: fetchedTodos, pagination } =
				await todoService.getTodos(filters);
			set((state) => ({
				todos: append
					? [...state.todos, ...fetchedTodos]
					: fetchedTodos,
				pagination,
				isLoading: false,
			}));
		} catch (error) {
			set({ error: 'Failed to fetch todos', isLoading: false });
		}
	},
	addTodo: async (todo: Omit<Todo, 'id'>): Promise<void> => {
		try {
			const { todo: newTodo } = await todoService.addTodo(todo);
			set((state) => ({ todos: [...state.todos, newTodo] }));
		} catch (error) {
			set({ error: 'Failed to add todo' });
		}
	},
	updateTodo: async (
		id: number,
		updates: Omit<Todo, 'id'>,
	): Promise<void> => {
		try {
			const { todo: updatedTodo } = await todoService.updateTodo(
				id,
				updates,
			);
			set((state) => ({
				todos: state.todos.map((todo) =>
					todo.id === id ? updatedTodo : todo,
				),
			}));
		} catch (error) {
			set({ error: 'Failed to update todo' });
		}
	},
	deleteTodo: async (id: number): Promise<void> => {
		try {
			await todoService.deleteTodo(id);
			set((state) => ({
				todos: state.todos.filter((todo) => todo.id !== id),
			}));
		} catch (error) {
			set({ error: 'Failed to delete todo' });
		}
	},
	resetTodos: (): void => {
		set({ todos: [], pagination: null, error: null });
	},
}));
