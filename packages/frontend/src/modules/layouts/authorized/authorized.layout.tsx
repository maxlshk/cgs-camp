import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { authorizedStyles, contentStyles } from './authorized.styles';
import { Navbar } from '~shared/ui/navbar/navbar.component';
import Loader from '~shared/components/loader/loader.component';
import { useAuth } from '~shared/hooks/useAuth';
import { useDisplayType } from '~shared/hooks/useDisplayType';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';

const AuthorizedLayout: React.FC = () => {
	const { getUser } = useUserStore();
	const { accessToken, isLoading } = useAuth();
	const { fetchTodos, resetTodos } = useTodoStore();
	const { displayType } = useDisplayType();

	useEffect(() => {
		resetTodos();
	}, [displayType]);

	useEffect(() => {
		if (accessToken) {
			getUser();
			fetchTodos();
		}
	}, []);

	return (
		<div className={authorizedStyles}>
			<Navbar />
			{isLoading ? (
				<Loader />
			) : (
				<div className={contentStyles}>
					<Outlet />
				</div>
			)}
		</div>
	);
};

export default AuthorizedLayout;
