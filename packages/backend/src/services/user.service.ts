import { PrismaClient, User } from '@prisma/client';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class UserService {
	async createUser(userData: User): Promise<User> {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		const verificationToken = crypto.randomBytes(32).toString('hex');

		const user = await prisma.user.create({
			data: {
				...userData,
				password: hashedPassword,
				verificationToken,
			},
		});
		await sendVerificationEmail(user.email, verificationToken);

		return user;
	}

	async verifyUser(token: string): Promise<User> {
		const user = await prisma.user.findFirst({
			where: { verificationToken: token },
		});

		if (!user) {
			throw new Error('Invalid verification token');
		}

		return prisma.user.update({
			where: { id: user.id },
			data: { isVerified: true, verificationToken: null },
		});
	}

	async loginUser(email: string, password: string): Promise<User> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !user.isVerified) {
			throw new Error('Invalid credentials or unverified account');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error('Invalid credentials');
		}

		return user;
	}

	async logoutUser(userId: number): Promise<void> {
		await prisma.user.update({
			where: { id: userId },
			data: { refreshToken: null, refreshTokenExpires: null },
		});
	}

	async editUser(userId: number, userData: Partial<User>): Promise<User> {
		return prisma.user.update({
			where: { id: userId },
			data: { name: userData.name },
		});
	}

	async getUserById(userId: number): Promise<User> {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	async saveRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<void> {
		const refreshTokenExpires = new Date(
			Date.now() + 7 * 24 * 60 * 60 * 1000,
		);
		await prisma.user.update({
			where: { id: userId },
			data: { refreshToken, refreshTokenExpires },
		});
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		const resetToken = crypto.randomBytes(32).toString('hex');
		const resetTokenExpires = new Date(Date.now() + 3600000);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				resetToken: resetToken,
				resetTokenExpires: resetTokenExpires,
			},
		});

		await sendPasswordResetEmail(email, resetToken);
	}

	async resetPassword(token: string, newPassword: string): Promise<User> {
		const user = await prisma.user.findFirst({
			where: {
				resetToken: token,
				resetTokenExpires: { gt: new Date() },
			},
		});

		if (!user) {
			throw new Error('Invalid or expired reset token');
		}

		const password = await bcrypt.hash(newPassword, 10);

		return prisma.user.update({
			where: { id: user.id },
			data: {
				password,
				resetToken: null,
				resetTokenExpires: null,
			},
		});
	}

	async changePassword(
		userId: number,
		currentPassword: string,
		newPassword: string,
	): Promise<User> {
		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw new Error('User not found');
		}

		const isPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password,
		);

		if (!isPasswordValid) {
			throw new Error('Invalid current password');
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		return prisma.user.update({
			where: { id: userId },
			data: { password: hashedNewPassword },
		});
	}
}
