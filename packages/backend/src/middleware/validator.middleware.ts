import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectSchema, ValidationError } from 'joi';

type RequestPart = 'body' | 'query' | 'params';

export const validate = (
	schema: ObjectSchema,
	source: RequestPart,
): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const { error }: { error?: ValidationError } = schema.validate(
			req[source],
			{
				allowUnknown: source === 'query',
				stripUnknown: source === 'body' || source === 'params',
			},
		);

		if (error) {
			res.status(400).json({ error: error.details[0].message });
		} else {
			next();
		}
	};
};
