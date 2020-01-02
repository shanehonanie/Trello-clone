import axios from 'axios';
import {
	GET_ERRORS,
	GET_PROJECTS,
	GET_PROJECT,
	ADD_PROJECT,
	DELETE_PROJECT
} from './types';

export const getProjects = () => async dispatch => {
	const res = await axios.get('/api/project/all');
	dispatch({
		type: GET_PROJECTS,
		payload: res.data
	});
};

export const getProject = id => async dispatch => {
	try {
		const res = await axios.get(`/api/project/${id}`);
		console.log('projectActions getproject res.data', res.data);
		dispatch({
			type: GET_PROJECT,
			payload: res.data
		});
	} catch (err) {
		console.log('projectActions getproject error');
		// TODO: Error Handling
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const createProject = project => async dispatch => {
	try {
		const res = await axios.post('/api/project', project);
		dispatch({
			type: ADD_PROJECT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const deleteProject = id => async dispatch => {
	if (window.confirm('Are you sure you want to delete project?')) {
		await axios.delete(`/api/project/${id}`);
		dispatch({
			type: DELETE_PROJECT,
			payload: id
		});
	}
};
