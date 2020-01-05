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
		columnOrder: ['TODO', 'IN_PROGRESS', 'DONE']
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

	// TODO: Put Backlog into redux
	componentDidUpdate() {
		if (
			this.state.tasks.length !== this.props.projectTasks.length ||
			this.state.tasks[0].projectIdentifier !==
				this.props.projectTasks[0].projectIdentifier
		) {
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
	}

	onUpdateTaskStatus = (taskToUpdate, newStatus) => {
		// Get the task id from tasks[]
		const updatedTaskObj = this.state.tasks.find(
			t => t.projectSequence === taskToUpdate
		);

		// Update new status and persist
		updatedTaskObj.status = newStatus;
		this.props.onUpdateTaskCallback(updatedTaskObj);
	};

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
		const finish = this.state.columns[destination.droppableId];

		// move within same column
		if (start === finish) {
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
			return;
		}

		// else : move between different columns
		const startTaskIds = Array.from(start.taskIds);
		this.onUpdateTaskStatus(
			startTaskIds[source.index],
			destination.droppableId
		);

		startTaskIds.splice(source.index, 1); // remove one item from source index

		// for updating start column state
		const newStart = {
			...start,
			taskIds: startTaskIds
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId); // insert one into dest. loc.

		// for updating destination column state
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};

		// update the columns state
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
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

						return (
							<Column
								key={column.id}
								column={column}
								tasks={tasks}
								setIdCallback={this.props.setIdCallback}
								toggleEditModalCallback={this.props.toggleEditModalCallback}
								toggleDeleteModalCallback={this.props.toggleDeleteModalCallback}
							/>
						);
					})}
				</Container>
			</DragDropContext>
		);
	}
}

export default Backlog;
