export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	SIGNUP = '/signup',
	DASHBOARD = '/dashboard',
	NEW = '/todos/new',
	EDIT = '/todos/edit/:id',
	VERIFY = '/verify/:token',
	EDIT_PROFILE = '/edit-profile',
	CHANGE_PASSWORD = '/change-password',
	FORGOT_PASSWORD = '/forgot-password',
	RESET_PASSWORD = '/reset-password/:token',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
});
