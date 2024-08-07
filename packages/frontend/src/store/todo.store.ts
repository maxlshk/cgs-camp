import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { todoService } from '~shared/services/todo.service';
import { Todo } from '~shared/types/todo.type';

interface TodoState {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
	fetchTodos: () => Promise<void>;
	addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
	updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>()(
	persist(
		(set) => ({
			todos: [],
			isLoading: false,
			error: null,
			fetchTodos: async (): Promise<void> => {
				set({ isLoading: true, error: null });
				try {
					const todos = await todoService.getTodos();
					set({ todos, isLoading: false });
				} catch (error) {
					set({ error: 'Failed to fetch todos', isLoading: false });
				}
			},
			addTodo: async (todo: Omit<Todo, 'id'>): Promise<void> => {
				set({ isLoading: true, error: null });
				try {
					const newTodo = await todoService.addTodo(todo);
					set((state) => ({
						todos: [...state.todos, newTodo],
						isLoading: false,
					}));
				} catch (error) {
					set({ error: 'Failed to add todo', isLoading: false });
				}
			},
			updateTodo: async (
				id: number,
				updates: Partial<Todo>,
			): Promise<void> => {
				set({ isLoading: true, error: null });
				try {
					const updatedTodo = await todoService.updateTodo(
						id,
						updates,
					);
					set((state) => ({
						todos: state.todos.map((todo) =>
							todo.id === id ? updatedTodo : todo,
						),
						isLoading: false,
					}));
				} catch (error) {
					set({ error: 'Failed to update todo', isLoading: false });
				}
			},
			deleteTodo: async (id: number): Promise<void> => {
				set({ isLoading: true, error: null });
				try {
					await todoService.deleteTodo(id);
					set((state) => ({
						todos: state.todos.filter((todo) => todo.id !== id),
						isLoading: false,
					}));
				} catch (error) {
					set({ error: 'Failed to delete todo', isLoading: false });
				}
			},
		}),
		{
			name: 'todo-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ todos: state.todos }),
		},
	),
);
