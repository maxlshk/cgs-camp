import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodos(_req: Request, res: Response): Promise<void> {
		const { todos, total } = await this.todoService.getTodos();

		res.json({
			todos,
			pagination: {
				total,
				// ... other pagination data will be added in task 6
			},
		});
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const todo = await this.todoService.getTodoById(id);

		res.json(todo);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const todo = await this.todoService.createTodo({ ...req.body });
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
