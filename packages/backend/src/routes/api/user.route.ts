import { Router } from 'express';
import { validateBody } from '../../middleware/validator.middleware';
import { authenticateJwt } from '../../middleware/auth.middleware';
import * as userController from '../../controllers/user.controller';
import { userSchema } from '../../schemas/user.schema';
import { loginSchema } from '../../schemas/login.schema';
import { forgotPasswordSchema } from '@/schemas/forgot-password.schema';
import { resetPasswordSchema } from '@/schemas/reset-password.schema';
import { changePasswordSchema } from '@/schemas/change-password.schema';

const router: Router = Router();

router.post('/signup', validateBody(userSchema), userController.signup);

router.post('/login', validateBody(loginSchema), userController.login);

router.post('/refresh-token', userController.refreshToken);

router.post('/logout', authenticateJwt, userController.logout);

router.get('/verify/:token', userController.verifyAccount);

router.post(
	'/forgot-password',
	validateBody(forgotPasswordSchema),
	userController.forgotPassword,
);

router.post(
	'/reset-password',
	validateBody(resetPasswordSchema),
	userController.resetPassword,
);

router.post(
	'/change-password',
	authenticateJwt,
	validateBody(changePasswordSchema),
	userController.changePassword,
);

export default router;
