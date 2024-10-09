import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { FilteredRequest } from '@/types/request.type';
import { TodoStatus } from '@/enums/todo-status.enum';

export const filtersMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
): void => {
	const query = req.query;
	const filters: Prisma.TodoWhereInput = {};

	if (typeof query.search === 'string') {
		const searchValue = query.search.replace(/^'|'$/g, '');
		filters.title = {
			contains: searchValue,
			mode: 'insensitive',
		};
	}

	if (typeof query.status === 'string') {
		switch (query.status.toLowerCase()) {
			case TodoStatus.Completed:
				filters.isCompleted = true;
				break;
			case TodoStatus.Incomplete:
				filters.isCompleted = false;
				break;
		}
	}

	if (typeof query.private === 'string') {
		if (/^true$/i.test(query.private)) {
			filters.isPrivate = true;
		} else if (/^false$/i.test(query.private)) {
			filters.isPrivate = false;
		}
	}

	(req as FilteredRequest).filters = filters;

	next();
};

export default filtersMiddleware;
