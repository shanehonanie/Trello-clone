import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import ProjectTask from './ProjectTasks/ProjectTask';

const Container = styled.div`
	width: 300px;
`;

const Title = styled.h3`
	padding: 8px;
`;

const TaskList = styled.div`
	padding: 8px;
`;

class Backlog extends Component {
	state = {
		columns: {
			TODO: {
				id: 'TODO',
				title: 'TODO',
				tasks: []
			},
			IN_PROGRESS: {
				id: 'IN PROGRESS',
				title: 'In Progress',
				tasks: []
			},
			DONE: {
				id: 'DONE',
				title: 'Done',
				tasks: []
			}
		}
	};

	onDragEnd = result => {
		console.log('result', result);
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

		console.log('start', start);
		console.log('finish', finish);

		// check if start column same as finish column
		if (start === finish) {
			//const newTasks = Array.from(start.tasks);
			const newTasks = [];

			for (let x of Object.keys(start)) {
				let y = start[x];
				console.log('y', y);
			}

			console.log('newTasks created', newTasks);
			newTasks.splice(source.index, 1); // remove one item from this index
			newTasks.splice(destination.index, 0, draggableId); // insert into dest loc.

			console.log('draggableId', draggableId);
			console.log('newTasks after splice', newTasks);

			// create a new column array with same properties + new taskIds
			const newColumn = {
				...start,
				tasks: newTasks
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

		// // Move from one column to antother
		// // Moving from one list to another
		// const startTaskIds = Array.from(start.taskIds);
		// startTaskIds.splice(source.index, 1); // remove one item from this index
		// const newStart = {
		// 	...start,
		// 	taskIds: startTaskIds
		// };

		// const finishTaskIds = Array.from(finish.taskIds);
		// finishTaskIds.splice(destination.index, 0, draggableId); // add new task
		// const newFinish = {
		// 	...finish,
		// 	taskIds: finishTaskIds
		// };

		// // new state to update columns with updated task ids
		// const newState = {
		// 	...this.state,
		// 	columns: {
		// 		...this.state.columns,
		// 		[newStart.id]: newStart,
		// 		[newFinish.id]: newFinish
		// 	}
		// };

		// this.setState(newState);
		// return;
	};

	// get the Project Task from the array that matches the project sequence
	getProjectTask = (projectTasks, projectSeq) => {
		for (let i = 0; i < projectTasks.length; i++) {
			if (projectSeq === projectTasks[i].projectSequence)
				return projectTasks[i];
		}
		return null;
	};

	render() {
		const { projectTasks } = this.props;
		const { columns } = this.state;

		console.log('projectTasks', projectTasks);

		// const tasks = projectTasks.map(t => (
		// 	<ProjectTask key={t.projectSequence} projectTask={t} />
		// ));

		// console.log('tasks', tasks);

		for (let i = 0; i < projectTasks.length; i++) {
			if (projectTasks[i].status === 'TODO') {
				columns['TODO'].tasks.push(projectTasks[i].projectSequence);
			}

			if (projectTasks[i].status === 'IN_PROGRESS') {
				columns['IN_PROGRESS'].tasks.push(projectTasks[i].projectSequence);
			}

			if (projectTasks[i].status === 'DONE') {
				columns['DONE'].tasks.push(projectTasks[i].projectSequence);
			}
		}
		console.log('columns', columns);

		return (
			<div className='container'>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<div className='row'>
						<div className='col-md-4'>
							<div className='card text-center mb-2'>
								<div className='card-header bg-secondary text-white'>
									{/* Column Logic */}
									<Container>
										<Title>{columns['TODO'].title}</Title>
										<Droppable droppableId={columns['TODO'].id}>
											{provided => (
												<TaskList
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													{columns['TODO'].tasks.map((t, index) => (
														<ProjectTask
															key={t.key}
															projectTask={t.props.projectTask}
															index={index}
														/>
													))}
													{provided.placeholder}
												</TaskList>
											)}
										</Droppable>
									</Container>
									{/* End Column Logic */}
								</div>
							</div>
						</div>
					</div>
				</DragDropContext>
			</div>
		);
	}
}

export default Backlog;

// {columns['TODO'].tasks.map((t, index) => {
// 	console.log('t.key', t.key);
// 	console.log(
// 		't.props.projectTask',
// 		t.props.projectTask
// 	);
// 	console.log('index', index);
// })}

{
	/* <div className='col-md-4'>
							<div className='card text-center mb-2'>
								<div className='card-header bg-primary text-white'>
									<h3>In Progress</h3>
								</div>
							</div>
							{columns['IN_PROGRESS'].tasks}
						</div>

						<div className='col-md-4'>
							<div className='card text-center mb-2'>
								<div className='card-header bg-success text-white'>
									<h3>Done</h3>
								</div>
							</div>
							{columns['DONE'].tasks}
						</div> */
}
