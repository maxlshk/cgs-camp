import { HttpService } from './http.service';
import { User } from '../types/user.type';
import { API_BASE, UESR_API_KEYS } from '~shared/keys';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class UserService extends HttpService {
	constructor() {
		super(`${API_URL}${API_BASE.USER}`);
	}

	async getUser(): Promise<User> {
		return this.get<User>(UESR_API_KEYS.PROFILE);
	}

	async verifyUser(token: string): Promise<{ message: string }> {
		return this.get<{ message: string }>(
			`${UESR_API_KEYS.VERIFY}/${token}`,
		);
	}

	async signUp(
		user: Partial<User>,
	): Promise<{ message: string; user: User }> {
		return this.post<{ message: string; user: User }>(
			UESR_API_KEYS.SIGNUP,
			user,
		);
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
		}>(UESR_API_KEYS.LOGIN, user);
		return response;
	}

	async changePassword(
		currentPassword: string,
		newPassword: string,
	): Promise<{ message: string }> {
		return this.post<{ message: string }>(UESR_API_KEYS.CHANGE_PASSWORD, {
			currentPassword,
			newPassword,
		});
	}

	async forgotPassword(email: string): Promise<{ message: string }> {
		return this.post<{ message: string }>(UESR_API_KEYS.FORGOT_PASSWORD, {
			email,
		});
	}

	async resetPassword(
		token: string,
		newPassword: string,
	): Promise<{ message: string }> {
		return this.post<{ message: string }>(UESR_API_KEYS.RESET_PASSWORD, {
			token,
			newPassword,
		});
	}

	async editProfile(changes: {
		name: string;
	}): Promise<{ message: string; editedUser: User }> {
		return this.put<{ message: string; editedUser: User }>(
			UESR_API_KEYS.EDIT_PROFILE,
			changes,
		);
	}

	async logOut(): Promise<{ message: string }> {
		return this.post<{ message: string }>('/user/logout');
	}
}

export const userService = new UserService();
