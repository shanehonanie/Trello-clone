import axios from 'axios';

import demoData from '../components/ProjectBoard/ProjectTasks/demo-data';

import {
	GET_BACKLOG,
	SET_BACKLOG,
	CLEAR_BACKLOG,
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

export const getBacklogForDemo = () => async dispatch => {
	try {
		dispatch({
			type: GET_BACKLOG,
			payload: demoData.tasks
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const setBacklog = backlog => async dispatch => {
	try {
		dispatch({
			type: SET_BACKLOG,
			payload: backlog
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
export const clearBacklog = () => async dispatch => {
	try {
		dispatch({
			type: CLEAR_BACKLOG,
			payload: {}
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
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
		// console.log('backlogActions.js updateProjectTask projectTask', projectTask);
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
