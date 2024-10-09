import { Prisma, User } from '@prisma/client';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
	user: User;
}

export interface FilteredRequest extends AuthenticatedRequest {
	filters?: Prisma.TodoWhereInput;
}