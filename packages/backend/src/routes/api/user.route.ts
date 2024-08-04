import { Router } from 'express';
import { body } from 'express-validator';
import { validateBody } from '../../middleware/validator.middleware';
import { authenticateJwt } from '../../middleware/auth.middleware';
import * as userController from '../../controllers/user.controller';
import { userSchema } from '../../types/user.type';
import { loginSchema } from '../../types/login.type';

const router: Router = Router();

router.post('/signup', validateBody(userSchema), userController.signup);

router.post('/login', validateBody(loginSchema), userController.login);

router.post('/refresh-token', userController.refreshToken);

router.post('/logout', authenticateJwt, userController.logout);

router.get('/verify/:token', userController.verifyAccount);

router.post(
	'/forgot-password',
	[body('email').isEmail()],
	userController.forgotPassword,
);

router.post(
	'/reset-password',
	[body('token').isString(), body('newPassword').isLength({ min: 6 })],
	userController.resetPassword,
);

router.post(
	'/change-password',
	authenticateJwt,
	[
		body('currentPassword').isLength({ min: 6 }),
		body('newPassword').isLength({ min: 6 }),
	],
	userController.changePassword,
);

export default router;
