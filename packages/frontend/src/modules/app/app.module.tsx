import React, { useEffect } from 'react';
import Router from '~router/router';
import Loader from '~shared/components/loader/loader.component';
import { useAuth } from '~shared/hooks/useAuth';
import { useUserStore } from '~store/user.store';

const App = (): React.ReactElement => {
	const { getUser } = useUserStore();
	const { aToken, isLoading } = useAuth();

	useEffect(() => {
		if (aToken) {
			getUser();
		}
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return <Router />;
};

export default App;
