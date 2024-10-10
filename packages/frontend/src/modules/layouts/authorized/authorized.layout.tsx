import React from 'react';
import { Outlet } from 'react-router-dom';
import { authorizedStyles, contentStyles } from './authorized.styles';
import { Navbar } from '~shared/ui/navbar/navbar.component';

const AuthorizedLayout: React.FC = () => {
	return (
		<div className={authorizedStyles}>
			<Navbar />
			<div className={contentStyles}>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthorizedLayout;
