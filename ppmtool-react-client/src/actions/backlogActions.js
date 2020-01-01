import axios from 'axios';

import {
	GET_BACKLOG,
	GET_PROJECT_TASK,
	DELETE_PROJECT_TASK,
	GET_ERRORS
} from './types';

export const addProjectTask = (backlogId, projectTask) => async dispatch => {
	try {
		await axios.post(`/api/backlog/${backlogId}`, projectTask);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const getBacklog = backlogId => async dispatch => {
	try {
		const res = await axios.get(`/api/backlog/${backlogId}`);
		dispatch({
			type: GET_BACKLOG,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const getProjectTask = (backlogId, ptId, history) => async dispatch => {
	try {
		const res = await axios.get(`/api/backlog/${backlogId}/${ptId}`);
		dispatch({
			type: GET_PROJECT_TASK,
			payload: res.data
		});
	} catch (err) {
		history.push('/dashboard');
	}
};

export const updateProjectTask = projectTask => async dispatch => {
	try {
		console.log('backlogActions update projectTask', projectTask);
		await axios.patch(
			`/api/backlog/${projectTask.projectIdentifier}/${projectTask.projectSequence}`,
			projectTask
		);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const deleteProjectTask = (backlogId, ptId) => async dispatch => {
	await axios.delete(`/api/backlog/${backlogId}/${ptId}`);
	dispatch({
		type: DELETE_PROJECT_TASK,
		payload: ptId
	});
};
