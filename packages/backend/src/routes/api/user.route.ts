import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { validate } from '@/middleware/validator.middleware';
import { userSchema } from '@/validation/user/user.schema';
import { tryCatch } from '@/middleware/tryCatch.middleware';
import { loginSchema } from '@/validation/user/login.schema';
import { refreshTokenSchema } from '@/validation/user/refresh-token.schema';
import { authenticateJwt } from '@/middleware/auth.middleware';
import { forgotPasswordSchema } from '@/validation/user/forgot-password.schema';
import { changePasswordSchema } from '@/validation/user/change-password.schema';
import { editProfileSchema } from '@/validation/user/edit-profile.schema';
import { resetPasswordSchema } from '@/validation/user/reset-password.schema';

const router: Router = Router();

router.post(
	'/signup',
	validate(userSchema, 'body'),
	tryCatch(userController.signUp.bind(userController)),
);

router.post(
	'/login',
	validate(loginSchema, 'body'),
	tryCatch(userController.login.bind(userController)),
);

router.post(
	'/refresh-token',
	validate(refreshTokenSchema, 'body'),
	tryCatch(userController.refreshToken.bind(userController)),
);

router.post(
	'/logout',
	authenticateJwt,
	tryCatch(userController.logout.bind(userController)),
);

router.put(
	'/edit-profile',
	authenticateJwt,
	validate(editProfileSchema, 'body'),
	tryCatch(userController.editUser.bind(userController)),
);

router.get(
	'/verify/:id',
	tryCatch(userController.verifyAccount.bind(userController)),
);

router.get(
	'/me',
	authenticateJwt,
	tryCatch(userController.getProfile.bind(userController)),
);

router.post(
	'/forgot-password',
	validate(forgotPasswordSchema, 'body'),
	tryCatch(userController.forgotPassword.bind(userController)),
);

router.post(
	'/reset-password',
	validate(resetPasswordSchema, 'body'),
	tryCatch(userController.resetPassword.bind(userController)),
);

router.post(
	'/change-password',
	authenticateJwt,
	validate(changePasswordSchema, 'body'),
	tryCatch(userController.changePassword.bind(userController)),
);

export default router;
