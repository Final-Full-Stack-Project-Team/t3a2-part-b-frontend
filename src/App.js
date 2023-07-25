import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import SignInPage from './pages/account/SignIn';
import SignUpPage from './pages/account/SignUp';
import Completed from './Pages/Completed'
import Groups from './Pages/Groups'
import MyLists from './Pages/MyLists'

function App() {
	return (
		<BrowserRouter>
			<main>
				<Routes>
					<Route path ='/' element={<MyLists/>} />
					<Route path ='/sign-in' element={<SignInPage />} />
					<Route path ='/sign-up' element={<SignUpPage />} />
					<Route path ='completed' element={<Completed/>} />
					<Route path ='groups' element={<Groups/>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
