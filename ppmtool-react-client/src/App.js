import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='App'>
					<Header />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/addProject' component={AddProject} />
					<Route exact path='/updateProject/:id' component={UpdateProject} />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
