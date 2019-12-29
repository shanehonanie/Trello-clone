import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// import initialData from './ProjectTasks/initial-data';
import styled from 'styled-components';

import Column from './ProjectTasks/Column';

const Container = styled.div`
	display: flex;
`;
class Backlog extends Component {
	// state = initialData;
	state = {
		tasks: [],
		columns: {
			TODO: {
				id: 'TODO',
				title: 'To do',
				taskIds: []
			},
			IN_PROGRESS: {
				id: 'IN_PROGRESS',
				title: 'In progress',
				taskIds: []
			},
			DONE: {
				id: 'DONE',
				title: 'Done',
				taskIds: []
			}
		},
		columnOrder: ['TODO', 'DONE', 'IN_PROGRESS']
	};

	componentDidMount() {
		const { projectTasks } = this.props;

		const newTodoTasksIds = [];
		const newInProgressTasksIds = [];
		const newDoneTasksIds = [];

		for (let i = 0; i < projectTasks.length; i++) {
			if (projectTasks[i].status === 'TODO') {
				newTodoTasksIds.push(projectTasks[i].projectSequence);
			}
			if (projectTasks[i].status === 'IN_PROGRESS') {
				newInProgressTasksIds.push(projectTasks[i].projectSequence);
			}
			if (projectTasks[i].status === 'DONE') {
				newDoneTasksIds.push(projectTasks[i].projectSequence);
			}
		}

		this.setState(prevState => ({
			...prevState,
			tasks: [...projectTasks],
			columns: {
				...prevState.columns,
				TODO: {
					...prevState.columns.TODO,
					taskIds: newTodoTasksIds
				},
				IN_PROGRESS: {
					...prevState.columns.IN_PROGRESS,
					taskIds: newInProgressTasksIds
				},
				DONE: {
					...prevState.columns.DONE,
					taskIds: newDoneTasksIds
				}
			}
		}));
	}

	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		// no destination, do nothing
		if (!destination) return;

		// destinaton did not change from source, do nothing
		if (
			destination.draggableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// create copy of array instead of mutating original
		const start = this.state.columns[source.droppableId];

		const newTaskIds = Array.from(start.taskIds);
		newTaskIds.splice(source.index, 1); // remove one item from this index
		newTaskIds.splice(destination.index, 0, draggableId); // insert into dest loc.

		// create a new column array with same properties + new taskIds
		const newColumn = {
			...start,
			taskIds: newTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns, // copy column state if using multiple columns, not needed for one
				[newColumn.id]: newColumn // copy over new column id
			}
		};

		this.setState(newState);
	};

	getTaskFromArr = projectSeq => {
		const { tasks } = this.state;

		for (let i = 0; i < tasks.length; i++) {
			if (projectSeq === this.state.tasks[i].projectSequence) {
				return this.state.tasks[i];
			}
		}
		return null;
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Container>
					{this.state.columnOrder.map(columnId => {
						const column = this.state.columns[columnId];
						const tasks = column.taskIds.map(taskId =>
							this.getTaskFromArr(taskId)
						);

						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</Container>
			</DragDropContext>
		);
	}
}

export default Backlog;
