import { Pagination } from '@/types/request.type';
import { Prisma, PrismaClient, Todo, User } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getTodos(
		userId: number,
		filters: Prisma.TodoWhereInput,
		pagination: Pagination,
	): Promise<{ todos: Todo[]; total: number }> {
		filters.AND = [
			{
				OR: [{ isPrivate: false }, { userId: userId }],
			},
		];

		const [todos, total] = await Promise.all([
			prisma.todo.findMany({
				where: filters,
				orderBy: { createdAt: 'desc' },
				skip: pagination?.skip,
				take: pagination?.take,
			}),
			prisma.todo.count({ where: filters }),
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
