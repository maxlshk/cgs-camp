import { HttpService } from './http.service';
import { Todo } from '../types/todo.type';
import { Pagination } from '~shared/types/pagination.type';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class TodoService extends HttpService {
	constructor() {
		super(API_URL);
	}

	async getTodos(): Promise<{ todos: Todo[]; pagination: Pagination }> {
		const params = new URLSearchParams();

		const queryString = params.toString();
		const url = `/todos/all${queryString ? `?${queryString}` : ''}`;

		return this.get<{ todos: Todo[]; pagination: Pagination }>(url);
	}

	async getMyTodos(): Promise<Todo[]> {
		const todos = this.get<Todo[]>('/todos/my');
		return todos;
	}

	async addTodo(
		todo: Omit<Todo, 'id'>,
	): Promise<{ message: string; data: Todo }> {
		const result = this.post<Todo>('/todos', todo);
		return result;
	}

	async updateTodo(
		id: number,
		updates: Omit<Todo, 'id'>,
	): Promise<{ message: string; data: Todo }> {
		const result = this.put<Todo>(`/todos/${id}`, updates);
		return result;
	}

	async deleteTodo(id: number): Promise<void> {
		return this.delete(`/todos/${id}`);
	}
}

export const todoService = new TodoService();
