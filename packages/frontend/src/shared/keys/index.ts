export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	SIGNUP = '/signup',
	DASHBOARD = '/dashboard',
	NEW = '/todos/new',
	EDIT = '/todos/edit/:id',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
});
