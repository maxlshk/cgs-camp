import Joi from 'joi';

export const changePasswordSchema = Joi.object({
	currentPassword: Joi.string().min(6).max(25).required(),
	newPassword: Joi.string().min(6).max(25).required(),
});
