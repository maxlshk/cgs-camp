import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getTodos(): Promise<{ todos: Todo[]; total: number }> {
		const [todos, total] = await Promise.all([
			prisma.todo.findMany({
				orderBy: { createdAt: 'desc' },
			}),
			prisma.todo.count(),
		]);

		return { todos, total };
	}

	async getTodoById(id: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });
		return todo;
	}

	async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async updateTodo(id: number, data: Partial<Todo>): Promise<Todo | null> {
		return prisma.todo.update({
			where: { id },
			data: {
				...data,
				createdAt: new Date(),
			},
		});
	}

	async deleteTodo(id: number): Promise<Todo | null> {
		return prisma.todo.delete({ where: { id } });
	}
}
