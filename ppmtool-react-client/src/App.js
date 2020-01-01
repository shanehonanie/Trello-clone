import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import Landing from './components/Layout/Landing';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
// import SecuredRoute from './securityUtils/SecureRoute';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
	setJWTToken(jwtToken);
	const decoded_jwtToken = jwt_decode(jwtToken);
	store.dispatch({
		type: SET_CURRENT_USER,
		payload: decoded_jwtToken
	});

	const currentTime = Date.now() / 1000;
	if (decoded_jwtToken.exp < currentTime) {
		store.dispatch(logout());
		window.location.href = '/';
	}
}

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				{/* <div className='App'> */}
				<Header />
				{
					// Public Routes
				}

				<Route exact path='/' component={Landing} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				{
					// Private Routes
				}
				<Switch>
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/addProject' component={AddProject} />
					<Route exact path='/updateProject/:id' component={UpdateProject} />
					<Route exact path='/projectBoard/:id' component={ProjectBoard} />
				</Switch>
				{/* </div> */}
			</BrowserRouter>
		</Provider>
	);
}

export default App;
