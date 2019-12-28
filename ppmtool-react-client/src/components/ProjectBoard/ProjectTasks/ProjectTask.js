import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { deleteProjectTask } from '../../../actions/backlogActions';

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
`;

class ProjectTask extends Component {
	onDeleteClick = (backlog_id, pt_id) => {
		this.props.deleteProjectTask(backlog_id, pt_id);
	};

	render() {
		console.log(this.props);

		const { projectTask } = this.props;
		let priorityString;
		let priorityClass;

		if (projectTask.priority === 1) {
			priorityClass = 'bg-danger text-light';
			priorityString = 'HIGH';
		}

		if (projectTask.priority === 2) {
			priorityClass = 'bg-warning text-light';
			priorityString = 'MEDIUM';
		}

		if (projectTask.priority === 3) {
			priorityClass = 'bg-info text-light';
			priorityString = 'LOW';
		}

		return (
			<Draggable
				draggableId={projectTask.projectSequence}
				index={this.props.index}
			>
				{provided => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<div className='card mb-1 bg-light'>
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
						</div>
					</Container>
				)}
			</Draggable>
		);
	}
}

ProjectTask.propTypes = {
	deleteProjectTask: PropTypes.func.isRequired
};
export default connect(null, { deleteProjectTask })(ProjectTask);
