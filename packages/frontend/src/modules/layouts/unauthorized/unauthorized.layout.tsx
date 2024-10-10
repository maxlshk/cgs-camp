import React from 'react';
import { Outlet } from 'react-router-dom';
import { unauthorizedStyles } from './unauthorized.styles';

const UnauthorizedLayout: React.FC = () => {
	return (
		<div className={unauthorizedStyles}>
			<Outlet />
		</div>
	);
};

export default UnauthorizedLayout;
