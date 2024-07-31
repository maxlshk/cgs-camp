// import * as React from 'react';

// export const publicRoutes = <>// PUBLIC_ROUTES</>;

// export const privateRoutes = <>// PRIVATE_ROUTES</>;

import React from 'react';
import { TodoContainer } from '../shared/components/container/todo.container.component.tsx';

export const ROUTER_KEYS = {
	HOME: '/',
	TODO: '/todo',
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
];
