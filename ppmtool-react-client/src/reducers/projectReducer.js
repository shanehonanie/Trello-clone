import {
	GET_PROJECTS,
	SET_PROJECT,
	CLEAR_PROJECT,
	ADD_PROJECT,
	UPDATE_PROJECT,
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
		case UPDATE_PROJECT:
			const index = state.projects.findIndex(p => p.id === action.payload.id);
			return {
				...state,
				projects: [
					...state.projects.slice(0, index),
					{
						...(state[index] = action.payload)
					},
					...state.projects.slice(index + 1)
				]
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
