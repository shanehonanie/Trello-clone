import axios from 'axios';
import {
	GET_ERRORS,
	GET_PROJECTS,
	GET_PROJECT,
	SET_PROJECT,
	CLEAR_PROJECT,
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
		dispatch({
			type: GET_PROJECT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const setProject = project => async dispatch => {
	try {
		dispatch({
			type: SET_PROJECT,
			payload: project
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
export const clearProject = () => async dispatch => {
	try {
		dispatch({
			type: CLEAR_PROJECT,
			payload: {}
		});
	} catch (err) {
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

export const deleteProject = project => async dispatch => {
	try {
		await axios.delete(`/api/project/${project.projectIdentifier}`);

		dispatch({
			type: DELETE_PROJECT,
			payload: project.projectIdentifier
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
