import {
	GET_PROJECTS,
	GET_PROJECT,
	SET_PROJECT,
	CLEAR_PROJECT,
	ADD_PROJECT,
	DELETE_PROJECT
} from '../actions/types';

const initialState = {
	projects: [],
	project: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload
			};
		case GET_PROJECT:
			return {
				...state,
				project: action.payload
			};
		case SET_PROJECT:
			return {
				...state,
				project: action.payload
			};
		case CLEAR_PROJECT:
			return {
				...state,
				project: {}
			};
		case ADD_PROJECT:
			return {
				...state,
				projects: state.projects.concat(action.payload)
			};
		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter(
					project => project.projectIdentifier !== action.payload
				)
			};
		default:
			return state;
	}
}
