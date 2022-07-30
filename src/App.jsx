import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './Routes';
import { MainNavbar } from './Components/navbar';

function App() {
	return (
		<Router>
			<MainNavbar />
			<AppRoutes />
		</Router>
	);
}
export default App;
