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

	const pagination = {} as { skip?: number; take?: number };

	const defaultLimit = 5;

	let page = 1;
	if (typeof query.page === 'string') {
		const parsedPage = parseInt(query.page, 10);
		if (!isNaN(parsedPage) && parsedPage > 0) {
			page = parsedPage;
		}
	}

	let limit = defaultLimit;
	if (typeof query.limit === 'string') {
		const parsedLimit = parseInt(query.limit, 10);
		if (!isNaN(parsedLimit) && parsedLimit > 0) {
			limit = parsedLimit;
		}
	}

	pagination.skip = (page - 1) * limit;
	pagination.take = limit;

	(req as FilteredRequest).pagination = pagination;

	next();
};

export default filtersMiddleware;
