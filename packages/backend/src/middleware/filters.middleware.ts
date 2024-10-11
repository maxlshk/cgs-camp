import { Request, Response, NextFunction } from 'express';
import { ParsedQs } from 'qs';
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

	const defaultLimit = 5;

	const parsePositiveInt = (
		value: ParsedQs[string],
		defaultValue: number,
	): number => {
		if (typeof value == 'string') {
			const parsed = parseInt(value, 10);
			return !isNaN(parsed) && parsed > 0 ? parsed : defaultValue;
		}
		return defaultValue;
	};

	const page = parsePositiveInt(query.page, 1);
	const limit = parsePositiveInt(query.limit, defaultLimit);

	const pagination = {
		skip: (page - 1) * limit,
		take: limit,
	};

	(req as FilteredRequest).pagination = pagination;

	next();
};

export default filtersMiddleware;
