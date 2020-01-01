import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { deleteProjectTask } from '../../../actions/backlogActions';

const Container = styled.div`
	font-size: 1.3rem;
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
	border-radius: 5px;
`;

class ProjectTask extends Component {
	onDeleteClick = (backlog_id, pt_id) => {
		this.props.deleteProjectTask(backlog_id, pt_id);
	};

	toggleEditModal = () => {
		// console.log('toggleEditModal called');
		this.props.setIdCallback(this.props.projectTask.id);
		this.props.toggleEditModalCallback();
		// console.log('this.props.projectTask', this.props.projectTask);
	};
	toggleDeleteModal = () => {
		// console.log('toggleDeleteModal called');
		this.props.setIdCallback(this.props.projectTask.id);
		this.props.toggleDeleteModalCallback();
		// console.log('this.props.projectTask', this.props.projectTask);
	};

	render() {
		const { projectTask } = this.props;
		let priorityString;
		let priorityClass;

		return (
			<Fragment>
				<Draggable
					draggableId={projectTask.projectSequence}
					index={this.props.index}
				>
					{(provided, snapshot) => (
						<Container
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>
							<div className='task-item'>
								<p>{projectTask.summary}</p>
								<div className='task-item__icon-list'>
									<span
										className='task-item__icon-list__edit'
										onClick={this.toggleEditModal}
									>
										<i className='far fa-edit' />
									</span>

									<span
										className='task-item__icon-list__remove'
										onClick={this.toggleDeleteModal}
									>
										<i className='fas fa-trash' />
									</span>
								</div>
							</div>
						</Container>
					)}
				</Draggable>
			</Fragment>
		);
	}
}

ProjectTask.propTypes = {
	deleteProjectTask: PropTypes.func.isRequired
};
export default connect(null, { deleteProjectTask })(ProjectTask);

{
	/* <div className='card mb-1 bg-light'>
							<div className={`card-header text-primary ${priorityClass}`}>
								ID: {projectTask.projectSequence} -- Priority: {priorityString}
							</div>
							<div className='card-body bg-light'>
								<h5 className='card-title'>{projectTask.summary}</h5>
								<p className='card-text text-truncate '>
									{projectTask.acceptanceCriteria}
								</p>
								<Link
									to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
									className='btn btn-primary'
								>
									View / Update
								</Link>

								<button
									className='btn btn-danger ml-4'
									onClick={() =>
										this.onDeleteClick(
											projectTask.projectIdentifier,
											projectTask.projectSequence
										)
									}
								>
									Delete
								</button>
							</div>
						</div> */
}
