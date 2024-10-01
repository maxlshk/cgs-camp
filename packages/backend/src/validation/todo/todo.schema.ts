import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().allow('').optional(),
	isCompleted: Joi.boolean().required(),
	isPrivate: Joi.boolean().required(),
	// userId: Joi.number(),
});
