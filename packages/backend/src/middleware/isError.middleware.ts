import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const isError = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const sendErrorResponse = (
		status: number,
		message: string,
		data: unknown,
	): void => {
		res.status(status).json({ status, message, data });
	};

	if (err instanceof HttpError) {
		return sendErrorResponse(err.status, err.name, err);
	}

	const error = err as { status?: number; message?: string };
	const status = error.status || 500;
	const message = error.message || 'Critical error occurred';

	return sendErrorResponse(
		status,
		message,
		err instanceof Error ? err.message : 'Unknown error',
	);
};
