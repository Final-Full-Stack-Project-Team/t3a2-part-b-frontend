import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Completed from './Pages/Completed'
import Groups from './Pages/Groups'
import MyLists from './Pages/MyLists'

function App() {
	return (
		<BrowserRouter>
			<main>
				<Routes>
					<Route path ="/" element={<MyLists/>} />
					<Route path ="completed" element={<Completed/>} />
					<Route path ="groups" element={<Groups/>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
