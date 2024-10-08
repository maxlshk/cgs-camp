import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userService } from '~shared/services/user.service';
import { User } from '~shared/types/user.type';

interface UserState {
	user: User | null;
	isLoading: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	error: string | null;
	getUser: () => Promise<void>;
	verifyUser: (token: string) => Promise<string>;
	logIn: (user: Partial<User>) => Promise<string>;
	signUp: (user: Partial<User>) => Promise<string>;
	changePassword: (
		currentPassword: string,
		newPassword: string,
	) => Promise<string>;
	forgotPassword: (email: string) => Promise<string>;
	resetPassword: (token: string, newPassword: string) => Promise<string>;
	editProfile: (changes: { name: string }) => Promise<string>;
	logOut: () => Promise<string>;
	setAccessToken: (token: string | null) => void;
	setRefreshToken: (token: string | null) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: false,
			accessToken: null,
			refreshToken: null,
			error: null,
			getUser: async (): Promise<void> => {
				set({ isLoading: true });
				try {
					const user = await userService.getUser();
					set({ user });
				} catch (error) {
					set({ error: 'Failed to fetch user' });
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			verifyUser: async (token): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message } = await userService.verifyUser(token);
					return message;
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to verify user',
					});
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			logIn: async (user): Promise<string> => {
				set({ isLoading: true });
				try {
					const {
						message,
						user: receivedUser,
						accessToken,
						refreshToken,
					} = await userService.logIn(user);
					set({
						user: receivedUser,
						accessToken,
						refreshToken,
						error: null,
					});
					return message;
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to log in',
					});
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			signUp: async (user): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message, user: receivedUser } =
						await userService.signUp(user);
					set({ user: receivedUser });
					return message;
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to sign up',
					});
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			changePassword: async (
				currentPassword,
				newPassword,
			): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message } = await userService.changePassword(
						currentPassword,
						newPassword,
					);
					return message;
				} catch (error) {
					set({ error: 'Failed to change password' });
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			forgotPassword: async (email): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message } = await userService.forgotPassword(email);
					return message;
				} catch (error) {
					set({ error: 'Failed to process forgot password request' });
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			resetPassword: async (token, newPassword): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message } = await userService.resetPassword(
						token,
						newPassword,
					);
					return message;
				} catch (error) {
					set({ error: 'Failed to reset password' });
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},
			editProfile: async (changes): Promise<string> => {
				set({ isLoading: true });
				try {
					const { message, editedUser } =
						await userService.editProfile(changes);
					set({ user: editedUser });
					return message;
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to edit profile',
					});
					throw error;
				} finally {
					set({ isLoading: false });
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
					set({ error: 'Failed to log out' });
					throw error;
				}
			},
			setAccessToken: (token): void => set({ accessToken: token }),
			setRefreshToken: (token): void => set({ refreshToken: token }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
		},
	),
);
