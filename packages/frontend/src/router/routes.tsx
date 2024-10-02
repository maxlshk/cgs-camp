import * as React from 'react';
import { ROUTER_KEYS } from '~shared/keys';

const TodosPage = React.lazy(() =>
	import('~pages/dashboard/dashboard.page').then((module) => ({
		default: module.Dashboard,
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
	// no public routes until auth is implemented
];

export const privateRoutes = [
	{
		path: ROUTER_KEYS.DASHBOARD,
		element: <TodosPage />,
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
