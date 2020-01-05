import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backlog from './Backlog';
import {
	getBacklog,
	updateProjectTask,
	deleteProjectTask
} from '../../actions/backlogActions';
import AddTaskModal from './ProjectTasks/AddTaskModal';
import UpdateTaskModal from './ProjectTasks/UpdateTaskModal';
import DeleteTaskModal from './ProjectTasks/DeleteTaskModal';

class ProjectBoard extends Component {
	state = {
		showAddModal: false,
		showUpdateModal: false,
		showDeleteModal: false,
		selectedProjectId: -1,
		errors: {}
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.getBacklog(id);
	}
	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			const { id } = this.props.match.params;
			this.props.getBacklog(id);
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else return null;
	}

	toggleAddModal = e => {
		this.setState({
			showAddModal: !this.state.showAddModal
		});
	};
	toggleUpdateModal = e => {
		this.setState({
			showUpdateModal: !this.state.showUpdateModal
		});
	};

	toggleDeleteModal = e => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal
		});
	};

	setSelectedProject = id => {
		this.setState({ selectedProjectId: id });
	};

	onDeleteCallback = () => {
		const { projectTasks } = this.props.backlog;
		const selectedProject = projectTasks.find(
			proj => proj.id === this.state.selectedProjectId
		);
		this.props.deleteProjectTask(
			selectedProject.projectIdentifier,
			selectedProject.projectSequence
		);
		this.toggleDeleteModal();
	};

	onUpdateCallback = updatedProjectTask => {
		this.props.updateProjectTask(updatedProjectTask);
		// TODO: implement toggle instead of reload page to update
		// this.toggleUpdateModal();
	};

	render() {
		// const { id } = this.props.match.params;
		const { projectTasks } = this.props.backlog;
		const { errors } = this.state;

		let boardContent;

		const boardAlgorithm = (errors, projectTasks) => {
			// TODO : Remove Bootstrap Alerts
			if (projectTasks.length === 0) {
				if (errors.projectNotFound) {
					return (
						<div className='alert alert-danger text-center' role='alert'>
							{errors.projectNotFound}
						</div>
					);
				} else if (errors.projectIdentifier) {
					return (
						<div className='alert alert-danger text-center' role='alert'>
							{errors.projectIdentifier}
						</div>
					);
				} else {
					return (
						<div className='alert alert-info text-center' role='alert'>
							No Project Tasks on this board
						</div>
					);
				}
			}

			return (
				<Backlog
					projectTasks={projectTasks}
					setIdCallback={this.setSelectedProject}
					toggleEditModalCallback={this.toggleUpdateModal}
					toggleDeleteModalCallback={this.toggleDeleteModal}
					onUpdateTaskCallback={this.onUpdateCallback}
				/>
			);
		};

		boardContent = boardAlgorithm(errors, projectTasks);

		return (
			<div className='container-background-blue'>
				<div className='container-center'>
					<AddTaskModal
						onClose={this.toggleAddModal}
						show={this.state.showAddModal}
						projectId={this.props.match.params.id}
					/>
					<UpdateTaskModal
						onClose={this.toggleUpdateModal}
						show={this.state.showUpdateModal}
						project={projectTasks.find(
							proj => proj.id === this.state.selectedProjectId
						)}
						onUpdateTaskCallback={this.onUpdateCallback}
					/>
					<DeleteTaskModal
						onClose={this.toggleDeleteModal}
						show={this.state.showDeleteModal}
						project={projectTasks.find(
							proj => proj.id === this.state.selectedProjectId
						)}
						onDeleteTaskCallback={this.onDeleteCallback}
						setIdCallback={this.setSelectedProject}
					/>
					<button
						className='create-project-task-btn'
						onClick={this.toggleAddModal}
					>
						<i className='fas fa-plus-circle'> Create Project Task</i>
					</button>
					{boardContent}
				</div>
			</div>
		);
	}
}

ProjectBoard.propTypes = {
	backlog: PropTypes.object.isRequired,
	getBacklog: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	deleteProjectTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	backlog: state.backlog,
	errors: state.errors
});

export default connect(mapStateToProps, {
	getBacklog,
	updateProjectTask,
	deleteProjectTask
})(ProjectBoard);
