import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navStyles, linkStyles, contentStyles } from '~modules/app/app.styles';
import { ROUTER_KEYS } from '~shared/keys';

const AuthorizedLayout: React.FC = () => {
	return (
		<>
			<nav className={navStyles}>
				<NavLink to={ROUTER_KEYS.DASHBOARD} className={linkStyles}>
					Dashboard
				</NavLink>
				<NavLink to={ROUTER_KEYS.TODO} className={linkStyles}>
					Todos
				</NavLink>
				<NavLink to={ROUTER_KEYS.NEW} className={linkStyles}>
					New Todo
				</NavLink>
			</nav>
			<div className={contentStyles}>
				<Outlet />
			</div>
		</>
	);
};

export default AuthorizedLayout;
