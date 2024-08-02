import Joi from 'joi';

export const userSchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().alphanum().required(),
	password: Joi.string().min(3).max(25).required(),
});
