import { User } from '~shared/types/user.type';
import { useUserStore } from '~store/user.store';

export const useAuth = (): {
	isAuthenticated: boolean;
	isLoading: boolean;
	shouldRedirect: boolean;
	accessToken: string;
	user: User;
} => {
	const { user, isLoading, accessToken } = useUserStore();
	const isAuthenticated = Boolean(accessToken) && Boolean(user);
	const shouldRedirect = !isAuthenticated && !isLoading;

	return { isAuthenticated, shouldRedirect, accessToken, isLoading, user };
};
