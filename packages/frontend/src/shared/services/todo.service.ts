import { HttpService } from './http.service';
import { Todo } from '../types/todo.type';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class TodoService extends HttpService {
	constructor() {
		super(API_URL);
	}

	async getTodos(): Promise<Todo[]> {
		return this.get<Todo[]>('/todos/all');
	}

	async getMyTodos(): Promise<Todo[]> {
		const todos = this.get<Todo[]>('/todos/my');
		return todos;
	}

	async addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
		return this.post<Todo>('/todos', todo);
	}

	async updateTodo(
		id: number,
		updates: Partial<Omit<Todo, 'id'>>,
	): Promise<Todo> {
		return this.put<Todo>(`/todos/${id}`, updates);
	}

	async deleteTodo(id: number): Promise<void> {
		return this.delete(`/todos/${id}`);
	}
}

export const todoService = new TodoService();
