import React from 'react';
import { Outlet } from 'react-router-dom';
import { contentStyles } from './authorized.styles';
import { Navbar } from '~shared/ui/navbar/navbar.component';
const AuthorizedLayout: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className={contentStyles}>
				<Outlet />
			</div>
		</>
	);
};

export default AuthorizedLayout;
