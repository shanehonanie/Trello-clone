import axios from 'axios';

import {
	GET_BACKLOG,
	GET_PROJECT_TASK,
	ADD_PROJECT_TASK,
	UPDATE_PROJECT_TASK,
	DELETE_PROJECT_TASK,
	GET_ERRORS
} from './types';

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

export const addProjectTask = (backlogId, projectTask) => async dispatch => {
	try {
		const res = await axios.post(`/api/backlog/${backlogId}`, projectTask);
		dispatch({
			type: ADD_PROJECT_TASK,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const updateProjectTask = projectTask => async dispatch => {
	try {
		console.log('backlogActions.js updateProjectTask projectTask', projectTask);
		const res = await axios.patch(
			`/api/backlog/${projectTask.projectIdentifier}/${projectTask.projectSequence}`,
			projectTask
		);
		dispatch({
			type: UPDATE_PROJECT_TASK,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const deleteProjectTask = (backlogId, ptId) => async dispatch => {
	try {
		// console.log('backlogActions.js deleteProjectTask backlogId', backlogId);
		// console.log('backlogActions.js deleteProjectTask ptId', ptId);
		await axios.delete(`/api/backlog/${backlogId}/${ptId}`);
		dispatch({
			type: DELETE_PROJECT_TASK,
			payload: ptId
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
