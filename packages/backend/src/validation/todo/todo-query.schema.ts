import Joi from 'joi';

export const todoQuerySchema = Joi.object({
	search: Joi.string().allow(''),
	isCompleted: Joi.boolean(),
	isPrivate: Joi.boolean(),
	// page: Joi.number().integer().min(1),
	// pageSize: Joi.number().integer().min(1).max(100),
}).options({ allowUnknown: true });
