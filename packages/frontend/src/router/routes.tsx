import * as React from 'react';
import { ROUTER_KEYS } from '~shared/keys';

const LoginPage = React.lazy(() =>
	import('~pages/login/login.page').then((module) => ({
		default: module.LoginPage,
	})),
);
const SignupPage = React.lazy(() =>
	import('~pages/signup/signup.page').then((module) => ({
		default: module.SignupPage,
	})),
);
const VerificationPage = React.lazy(() =>
	import('~pages/verification/verification.page').then((module) => ({
		default: module.VerificationPage,
	})),
);
const ForgotPasswordPage = React.lazy(() =>
	import('~pages/forgot-password/forgot-password.page').then((module) => ({
		default: module.ForgotPasswordPage,
	})),
);
const ResetPasswordPage = React.lazy(() =>
	import('~/pages/reset-password/reset-password.page').then((module) => ({
		default: module.ResetPasswordPage,
	})),
);

const Dashboard = React.lazy(() =>
	import('~pages/dashboard/dashboard.page').then((module) => ({
		default: module.Dashboard,
	})),
);
const ChangePasswordPage = React.lazy(() =>
	import('~pages/change-password/change-password.page').then((module) => ({
		default: module.ChangePasswordPage,
	})),
);
const EditProfilePage = React.lazy(() =>
	import('~pages/edit-profile/edit-profile.page').then((module) => ({
		default: module.EditProfilePage,
	})),
);
const CreateTodoPage = React.lazy(() =>
	import('~pages/create-todo/create-todo.page').then((module) => ({
		default: module.CreateTodoPage,
	})),
);
const EditTodoPage = React.lazy(() =>
	import('~pages/edit-todo/edit-todo.page').then((module) => ({
		default: module.EditTodoPage,
	})),
);

export const publicRoutes = [
	{
		path: ROUTER_KEYS.LOGIN,
		element: <LoginPage />,
	},
	{
		path: ROUTER_KEYS.SIGNUP,
		element: <SignupPage />,
	},
	{
		path: ROUTER_KEYS.VERIFY,
		element: <VerificationPage />,
	},
	{
		path: ROUTER_KEYS.FORGOT_PASSWORD,
		element: <ForgotPasswordPage />,
	},
	{
		path: ROUTER_KEYS.RESET_PASSWORD,
		element: <ResetPasswordPage />,
	},
];

export const privateRoutes = [
	{
		path: ROUTER_KEYS.DASHBOARD,
		element: <Dashboard />,
	},
	{
		path: ROUTER_KEYS.CHANGE_PASSWORD,
		element: <ChangePasswordPage />,
	},
	{
		path: ROUTER_KEYS.EDIT_PROFILE,
		element: <EditProfilePage />,
	},
	{
		path: ROUTER_KEYS.NEW,
		element: <CreateTodoPage />,
	},
	{
		path: ROUTER_KEYS.EDIT,
		element: <EditTodoPage />,
	},
];
