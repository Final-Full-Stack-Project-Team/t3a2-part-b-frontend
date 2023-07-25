import React from 'react';
import NavMenu from "./Components/NavMenu";
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import SignInPage from './pages/account/SignIn';
import SignUpPage from './pages/account/SignUp';

function App() {
	return (
		<React.Fragment>
			<NavMenu />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
