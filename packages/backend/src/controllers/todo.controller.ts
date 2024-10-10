import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';
import { User } from '@prisma/client';
import { AuthenticatedRequest, FilteredRequest } from '@/types/request.type';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getTodos(req: Request, res: Response): Promise<void> {
		const user = (req as AuthenticatedRequest).user;
		const filters = (req as FilteredRequest).filters || {};
		const pagination = (req as FilteredRequest).pagination || {};

		const { todos, total } = await this.todoService.getTodos(
			user.id,
			filters,
			pagination,
		);

		res.json({
			todos,
			pagination: {
				total,
				totalPages: Math.ceil(total / (pagination?.take ?? 5)),
				page: (pagination?.skip ?? 0) / (pagination?.take ?? 5) + 1,
				limit: pagination?.take ?? 5,
			},
		});
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const todo = await this.todoService.getTodoById(id);

		res.json(todo);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const todo = await this.todoService.createTodo(
			req.body,
			req.user as User,
		);
		res.status(201).json({
			message: 'Todo created successfully',
			todo: todo,
		});
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const updatedTodo = await this.todoService.updateTodo(id, req.body);

		res.json({
			message: 'Todo updated successfully',
			todo: updatedTodo,
		});
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		await this.todoService.deleteTodo(id);

		res.json({ message: 'Todo deleted successfully' });
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
