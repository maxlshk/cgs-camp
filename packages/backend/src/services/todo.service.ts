import { PrismaClient, Todo, User } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getTodos(userId: number): Promise<{ todos: Todo[]; total: number }> {
		const [todos, total] = await Promise.all([
			prisma.todo.findMany({
				where: {
					OR: [{ isPrivate: false }, { userId }],
				},
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

	async createTodo(todo: Omit<Todo, 'id'>, user: User): Promise<Todo> {
		return prisma.todo.create({
			data: {
				...todo,
				userId: user.id,
			},
		});
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
