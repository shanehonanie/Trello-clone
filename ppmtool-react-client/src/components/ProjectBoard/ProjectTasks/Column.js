import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import ProjectTask from './ProjectTask';

const Container = styled.div`
	margin: 0 2rem 0 1rem;
	border: 1px solid lightgrey;
	border-radius: 5px;
	width: 36rem;
	background-color: #ebecf0;
	color: 3e4f6b;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
	padding: 1rem;
	font-size: 2rem;
`;
const TaskList = styled.div`
	padding: 1rem;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#ebecf0')};
	flex-grow: 1;
	min-height: 8.5em;
`;

const AddTaskContainer = styled.div`
	font-size: 1.5rem;
	font-weight: 100;
	border-radius: 3px;
	color: #5e6c84;
	margin: 1rem;
	padding: 0.2rem 1.5rem;
	cursor: pointer;

	&:hover {
		background-color: #dadce2;
	}
`;

class Column extends Component {
	onClick = () => {
		// console.log('this.props.column', this.props.column.title);
		this.props.selectedColumnCallback(this.props.column.id);
		this.props.toggleAddModalCallback();
	};

	render() {
		return (
			<Container>
				<Title>{this.props.column.title}</Title>
				<Droppable droppableId={this.props.column.id}>
					{(provided, snapshot) => (
						<TaskList
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{this.props.tasks.map((task, index) => (
								<ProjectTask
									key={task.id}
									projectTask={task}
									index={index}
									setIdCallback={this.props.setIdCallback}
									toggleEditModalCallback={this.props.toggleEditModalCallback}
									toggleDeleteModalCallback={
										this.props.toggleDeleteModalCallback
									}
								/>
							))}
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
				<AddTaskContainer onClick={this.onClick}>
					<span>
						<i className='fas fa-plus'> Add another card</i>
					</span>
				</AddTaskContainer>
			</Container>
		);
	}
}

export default Column;
