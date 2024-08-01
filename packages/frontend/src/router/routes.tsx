// import * as React from 'react';

// export const publicRoutes = <>// PUBLIC_ROUTES</>;

// export const privateRoutes = <>// PRIVATE_ROUTES</>;

import React from 'react';
import { TodoContainer } from '../shared/components/container/todo.container.component.tsx';
import { TodoForm } from '~shared/components/form/todo.form.component.js';

export const ROUTER_KEYS = {
	HOME: '/',
	TODO: '/todo',
	NEW: '/todo/new',
	EDIT: '/todo/edit/:id',
};

export const routes = [
	{
		path: ROUTER_KEYS.HOME,
		element: <div>Home Page</div>,
	},
	{
		path: ROUTER_KEYS.TODO,
		element: <TodoContainer />,
	},
	{
		path: ROUTER_KEYS.NEW,
		element: <TodoForm />,
	},
	{
		path: ROUTER_KEYS.EDIT,
		element: <TodoForm />,
	},
];
