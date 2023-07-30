import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './Pages/Account/SignIn';
import SignUpPage from './Pages/Account/SignUp';
import Completed from './Pages/Completed'
import Groups from './Pages/Groups'
import MyLists from './Pages/MyLists'
import ListPage from './Pages/ListPage';

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path ='/' element={<MyLists/>} />
				<Route path='/list/:_id' element={<ListPage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path ='completed' element={<Completed/>} />
				<Route path ='groups' element={<Groups/>} />
			</Routes>
		</React.Fragment>
	);
}


export default App;
