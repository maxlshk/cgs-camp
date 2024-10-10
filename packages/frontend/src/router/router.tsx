import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { ROUTER_KEYS } from '~shared/keys';
import Loader from '~shared/components/loader/loader.component';
import AuthorizedLayout from '~modules/layouts/authorized/authorized.layout';
import UnauthorizedLayout from '~modules/layouts/unauthorized/unauthorized.layout';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route element={<UnauthorizedLayout />}>
						{publicRoutes.map((route, index) => (
							<Route
								key={`public-${index}`}
								path={route.path}
								element={route.element}
							/>
						))}
					</Route>
					<Route element={<AuthorizedLayout />}>
						{privateRoutes.map((route, index) => (
							<Route
								key={`private-${index}`}
								path={route.path}
								element={route.element}
							/>
						))}
					</Route>
					<Route
						path={ROUTER_KEYS.ALL_MATCH}
						element={<Navigate to={ROUTER_KEYS.LOGIN} replace />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default Router;
