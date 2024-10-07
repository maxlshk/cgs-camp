import { HttpService } from './http.service';
import { User } from '../types/user.type';
import { STORAGE_KEYS } from '~shared/keys';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class UserService extends HttpService {
	constructor() {
		super(API_URL);
	}

	async getUser(): Promise<User> {
		return this.get<User>('/user/me');
	}

	async verifyUser(token: string): Promise<{ message: string }> {
		return this.get<{ message: string }>(`/user/verify/${token}`);
	}

	async signUp(
		user: Partial<User>,
	): Promise<{ message: string; user: User }> {
		return this.post<{ message: string; user: User }>('/user/signup', user);
	}

	async logIn(user: Partial<User>): Promise<{
		message: string;
		user: User;
		accessToken: string;
		refreshToken: string;
	}> {
		const response = await this.post<{
			message: string;
			user: User;
			accessToken: string;
			refreshToken: string;
		}>('/user/login', user);
		return response;
	}

	async changePassword(
		currentPassword: string,
		newPassword: string,
	): Promise<{ message: string }> {
		return this.post<{ message: string }>('/user/change-password', {
			currentPassword,
			newPassword,
		});
	}

	async forgotPassword(email: string): Promise<{ message: string }> {
		return this.post<{ message: string }>('/user/forgot-password', {
			email,
		});
	}

	async resetPassword(
		token: string,
		newPassword: string,
	): Promise<{ message: string }> {
		return this.post<{ message: string }>('/user/reset-password', {
			token,
			newPassword,
		});
	}

	async editProfile(changes: {
		name: string;
	}): Promise<{ message: string; editedUser: User }> {
		return this.put<{ message: string; editedUser: User }>(
			'/user/edit-profile',
			changes,
		);
	}

	async logOut(): Promise<{ message: string }> {
		return this.post<{ message: string }>('/user/logout');
	}

	async refreshToken(): Promise<{ accessToken: string }> {
		const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
		if (!refreshToken) {
			throw new Error('No refresh token available');
		}
		return this.post<{ accessToken: string }>('/user/refresh-token', {
			refreshToken,
		});
	}
}

export const userService = new UserService();
