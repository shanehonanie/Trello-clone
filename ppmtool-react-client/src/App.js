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
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='App'>
					<Header />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/addProject' component={AddProject} />
					<Route exact path='/updateProject/:id' component={UpdateProject} />
					<Route exact path='/projectBoard/:id' component={ProjectBoard} />
					<Route exact path='/addProjectTask/:id' component={AddProjectTask} />
					<Route
						exact
						path='/updateProjectTask/:backlog_id/:pt_id'
						component={UpdateProjectTask}
					/>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
