import { create } from 'zustand';
import { userService } from '~shared/services/user.service';
import { User } from '~shared/types/user.type';

interface UserState {
	user: User;
	isLoading: boolean;
	error: string | null;
	getUser: () => Promise<void>;
	verifyUser: (token: string) => Promise<string>;
	signUp: (user: Partial<User>) => Promise<string>;
	logIn: (user: Partial<User>) => Promise<void>;
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
			set({ error: 'Failed to log in' });
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
