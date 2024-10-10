import { HttpService } from './http.service';
import { Todo } from '../types/todo.type';
import { Pagination } from '~shared/types/pagination.type';
import { API_BASE, TODO_API_KEYS } from '~shared/keys';
import { todoFilters } from '~shared/types/todo-filters.type';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class TodoService extends HttpService {
	constructor() {
		super(`${API_URL}${API_BASE.TODOS}`);
	}

	async getTodos(
		filters: Partial<todoFilters>,
	): Promise<{ todos: Todo[]; pagination: Pagination }> {
		const params = new URLSearchParams();
		Object.entries(filters || {}).forEach(([key, value]) => {
			if (value) {
				params.append(key, value);
			}
		});

		const queryString = params.toString();
		const url = `${TODO_API_KEYS.ALL}${queryString ? `?${queryString}` : ''}`;

		return this.get<{ todos: Todo[]; pagination: Pagination }>(url);
	}

	async getMyTodos(): Promise<Todo[]> {
		const todos = this.get<Todo[]>(TODO_API_KEYS.MY);
		return todos;
	}

	async addTodo(
		todo: Omit<Todo, 'id'>,
	): Promise<{ message: string; todo: Todo }> {
		const result = this.post<{ message: string; todo: Todo }>('', todo);
		return result;
	}

	async updateTodo(
		id: number,
		updates: Omit<Todo, 'id'>,
	): Promise<{ message: string; todo: Todo }> {
		const result = this.put<{ message: string; todo: Todo }>(
			id.toString(),
			updates,
		);
		return result;
	}

	async deleteTodo(id: number): Promise<void> {
		return this.delete(id.toString());
	}
}

export const todoService = new TodoService();
