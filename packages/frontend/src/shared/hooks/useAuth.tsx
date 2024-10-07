import { STORAGE_KEYS } from '~shared/keys';
import { User } from '~shared/types/user.type';
import { useUserStore } from '~store/user.store';

export const useAuth = (): {
	isAuthenticated: boolean;
	isLoading: boolean;
	shouldRedirect: boolean;
	aToken: string;
	user: User;
} => {
	const { user, isLoading } = useUserStore();
	const aToken = STORAGE_KEYS.ACCESS_TOKEN;
	const isAuthenticated = Boolean(aToken) && Boolean(user);
	const shouldRedirect = !isAuthenticated && !isLoading;

	return { isAuthenticated, shouldRedirect, aToken, isLoading, user };
};
