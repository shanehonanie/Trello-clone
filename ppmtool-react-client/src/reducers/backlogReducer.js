import {
	GET_BACKLOG,
	SET_BACKLOG,
	CLEAR_BACKLOG,
	ADD_PROJECT_TASK,
	UPDATE_PROJECT_TASK,
	DELETE_PROJECT_TASK
} from '../actions/types';

const initialState = {
	projectTasks: [],
	projectTask: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_BACKLOG:
			return {
				...state,
				projectTasks: action.payload
			};
		case SET_BACKLOG:
			return {
				...state,
				projectTask: action.payload
			};
		case CLEAR_BACKLOG:
			return {
				...state,
				projectTask: {}
			};
		case ADD_PROJECT_TASK:
			return {
				...state,
				projectTasks: state.projectTasks.concat(action.payload)
			};
		case UPDATE_PROJECT_TASK:
			const index = state.projectTasks.findIndex(
				p => p.id === action.payload.id
			);
			return {
				...state,
				projectTasks: [
					...state.projectTasks.slice(0, index),
					{
						...(state[index] = action.payload)
					},
					...state.projectTasks.slice(index + 1)
				]
			};
		case DELETE_PROJECT_TASK:
			return {
				...state,
				projectTasks: state.projectTasks.filter(
					projectTask => projectTask.projectSequence !== action.payload
				)
			};
		default:
			return state;
	}
}
