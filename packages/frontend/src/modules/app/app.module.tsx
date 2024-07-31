import React from 'react';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	return (
		<div>
			{/* Your app-wide components (e.g., Header, Footer) go here */}
			{children}
			{/* More app-wide components can go here */}
		</div>
	);
};

export default App;
