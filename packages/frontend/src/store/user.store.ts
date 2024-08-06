import { create } from 'zustand';
import { userService } from '~shared/services/user.service';
import { User } from '~shared/types/user.type';

interface UserState {
	user: User;
	isLoading: boolean;
	error: string | null;
	getUser: () => Promise<void>;
	verifyUser: (token: string) => Promise<string>;
	logIn: (user: Partial<User>) => Promise<void>;
	signUp: (user: Partial<User>) => Promise<string>;
	changePassword: (
		currentPassword: string,
		newPassword: string,
	) => Promise<string>;
	forgotPassword: (email: string) => Promise<string>;
	resetPassword: (token: string, newPassword: string) => Promise<string>;
	editProfile: (changes: { name: string }) => Promise<string>;
	logOut: () => Promise<string>;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	isLoading: false,
	error: null,
	getUser: async (): Promise<void> => {
		set({ isLoading: true });
		try {
			const user = await userService.getUser();
			set({ user, isLoading: false });
		} catch (error) {
			set({ error: 'Failed to fetch get user', isLoading: false });
		}
	},
	verifyUser: async (token: string): Promise<string> => {
		try {
			const { message } = await userService.verifyUser(token);
			return message;
		} catch (error) {
			set({ error: 'Failed to verify user', isLoading: false });
		}
	},
	logIn: async (user: Partial<User>): Promise<void> => {
		try {
			const { accessToken, refreshToken } = await userService.logIn(user);
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
		} catch (error) {
			console.log('caught error', error);
			set({ error: error.message });
			throw error;
		}
	},
	signUp: async (user: Partial<User>): Promise<string> => {
		try {
			const { message } = await userService.signUp(user);
			return message;
		} catch (error) {
			set({ error: 'Failed to update todo' });
		}
	},
	changePassword: async (
		currentPassword: string,
		newPassword: string,
	): Promise<string> => {
		try {
			const { message } = await userService.changePassword(
				currentPassword,
				newPassword,
			);
			return message;
		} catch (error) {
			set({ error: 'Failed to change password' });
		}
	},
	forgotPassword: async (email: string): Promise<string> => {
		try {
			const { message } = await userService.forgotPassword(email);
			return message;
		} catch (error) {
			set({ error: 'Failed to forgot password' });
			throw error;
		}
	},
	resetPassword: async (
		token: string,
		newPassword: string,
	): Promise<string> => {
		try {
			const { message } = await userService.resetPassword(
				token,
				newPassword,
			);
			return message;
		} catch (error) {
			set({ error: 'Failed to reset password' });
			throw error;
		}
	},
	editProfile: async (changes: { name: string }): Promise<string> => {
		try {
			const { message } = await userService.editProfile(changes);
			return message;
		} catch (error) {
			set({ error: 'Failed to edit profile' });
		}
	},
	logOut: async (): Promise<string> => {
		try {
			const { message } = await userService.logOut();
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			set({ user: null });
			return message;
		} catch (error) {
			set({ error: 'Failed to delete todo' });
		}
	},
}));
