import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {
	generateTokens,
	verifyRefreshToken,
} from '@/middleware/auth.middleware';
import { User } from '@prisma/client';

export class UserController {
	constructor(private userService: UserService) {}

	async signUp(req: Request, res: Response): Promise<void> {
		const user = await this.userService.createUser(req.body);
		res.status(201).json({
			message:
				'User created successfully. Please check your email to verify your account.',
			user,
		});
	}

	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;
		const user = await this.userService.loginUser(email, password);
		const { accessToken, refreshToken } = generateTokens(user);
		await this.userService.saveRefreshToken(user.id, refreshToken);
		res.json({
			message: 'User logged in successfully',
			accessToken,
			refreshToken,
			user,
		});
	}

	async logout(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		await this.userService.logoutUser(user.id);
		res.json({ message: 'User logged out successfully' });
	}

	async editUser(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const editedUser = await this.userService.editUser(user.id, req.body);
		res.json({
			message: 'User updated successfully',
			editedUser,
		});
	}

	async refreshToken(req: Request, res: Response): Promise<void> {
		const { refreshToken } = req.body;
		const userId = await verifyRefreshToken(refreshToken);
		const user = await this.userService.getUserById(userId);
		const tokens = generateTokens(user);
		await this.userService.saveRefreshToken(user.id, tokens.refreshToken);
		res.json(tokens);
	}

	async verifyAccount(req: Request, res: Response): Promise<void> {
		const { token } = req.params;
		await this.userService.verifyUser(token);
		res.json({ message: 'Account verified successfully' });
	}

	async getProfile(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const userData = await this.userService.getUserById(user.id);
		res.json(userData);
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		await this.userService.forgotPassword(email);
		res.json({ message: 'Password reset instructions sent to your email' });
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const { token, newPassword } = req.body;
		await this.userService.resetPassword(token, newPassword);
		res.json({ message: 'Password reset successfully' });
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const { currentPassword, newPassword } = req.body;
		await this.userService.changePassword(
			user.id,
			currentPassword,
			newPassword,
		);
		res.json({ message: 'Password changed successfully' });
	}
}

const userController = new UserController(new UserService());
export default userController;
