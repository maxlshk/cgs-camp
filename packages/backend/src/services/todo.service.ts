import { Prisma, PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getFilteredTodos(filters: {
		search?: string;
		status?: 'completed' | 'active';
		public?: boolean;
		userId: number;
	}): Promise<Todo[]> {
		const { search, status, public: isPublic, userId } = filters;

		let whereClause: Prisma.TodoWhereInput = {
			OR: [{ userId }, { public: true }],
		};

		if (search) {
			whereClause = {
				AND: [
					whereClause,
					{ title: { contains: search, mode: 'insensitive' } },
				],
			};
		}

		if (status === 'completed') {
			whereClause = {
				AND: [whereClause, { completed: true }],
			};
		} else if (status === 'active') {
			whereClause = {
				AND: [whereClause, { completed: false }],
			};
		}

		if (isPublic !== undefined) {
			whereClause = {
				AND: [whereClause, { public: isPublic }],
			};
		}

		return prisma.todo.findMany({
			where: whereClause,
		});
	}

	async getTodoById(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || (!todo.public && todo.userId !== userId)) {
			return null;
		}

		return todo;
	}

	async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async updateTodo(
		id: number,
		userId: number,
		data: Partial<Todo>,
	): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return null;
		}

		return prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteTodo(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return null;
		}

		return prisma.todo.delete({ where: { id } });
	}
}
