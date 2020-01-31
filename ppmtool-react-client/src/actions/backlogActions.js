import axios from 'axios';

import {
	GET_BACKLOG,
	SET_BACKLOG,
	CLEAR_BACKLOG,
	ADD_PROJECT_TASK,
	UPDATE_PROJECT_TASK,
	DELETE_PROJECT_TASK,
	GET_ERRORS
} from './types';
import demoData from '../components/ProjectBoard/ProjectTasks/demo-data';

export const getBacklog = backlogId => async dispatch => {
	try {
		const res = await axios.get(`/trelloclone/api/backlog/${backlogId}`);
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
		const res = await axios.post(
			`/trelloclone/api/backlog/${backlogId}`,
			projectTask
		);
		// console.log('backlogActions.js addProjectTask projectTask', projectTask);
		// console.log('backlogActions.js addProjectTask res.data', res.data);
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

export const addProjectTaskForDemo = (
	backlogId,
	projectTask
) => async dispatch => {
	try {
		// Generate a random 5 digit number and set it it proj seq & id to replicate DB assigning val
		const randNum = Math.floor(Math.random() * 90000) + 10000;
		projectTask.projectSequence = backlogId + '-' + randNum;
		projectTask.id = randNum;
		// console.log('backlogActions.js addProjectTask backlogId', backlogId);
		// console.log('backlogActions.js addProjectTask projectTask', projectTask);
		dispatch({
			type: ADD_PROJECT_TASK,
			payload: projectTask
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
		const res = await axios.patch(
			`/trelloclone/api/backlog/${projectTask.projectIdentifier}/${projectTask.projectSequence}`,
			projectTask
		);
		// console.log('backlogActions.js updateProjectTask projectTask', projectTask);
		// console.log('backlogActions.js updateProjectTask res.data', res.data);
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

export const updateProjectTaskForDemo = projectTask => async dispatch => {
	try {
		// console.log('backlogActions.js updateProjectTask projectTask', projectTask);
		// console.log('backlogActions.js updateProjectTask res.data', res.data);
		dispatch({
			type: UPDATE_PROJECT_TASK,
			payload: projectTask
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
		await axios.delete(`/trelloclone/api/backlog/${backlogId}/${ptId}`);
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

export const deleteProjectTaskForDemo = (backlogId, ptId) => async dispatch => {
	try {
		// console.log('backlogActions.js deleteProjectTask backlogId', backlogId);
		// console.log('backlogActions.js deleteProjectTask ptId', ptId);
		// await axios.delete(`/trelloclone/api/backlog/${backlogId}/${ptId}`);
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
