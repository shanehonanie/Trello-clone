import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import ProjectTask from './ProjectTask';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
  paddingL 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
	flex-grow: 1;
	min-height: 100px;
`;

class Column extends Component {
	render() {
		console.log('Column props', this.props);
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
								<ProjectTask key={task.id} projectTask={task} index={index} />
							))}
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</Container>
		);
	}
}

export default Column;
