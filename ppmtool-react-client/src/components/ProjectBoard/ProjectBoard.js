import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backlog from './Backlog';
import {
	getBacklog,
	updateProjectTask,
	deleteProjectTask,
	getBacklogForDemo,
	updateProjectTaskForDemo,
	deleteProjectTaskForDemo
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
		selectedColumn: '',
		errors: {}
	};

	componentDidMount() {
		// console.log('componentDidMount this.props.isDemo', this.props.isDemo);
		if (!this.props.isDemo) {
			const { id } = this.props.match.params;
			this.props.getBacklog(id);
		} else {
			this.props.getBacklogForDemo();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			!this.props.isDemo &&
			this.props.match.params.id !== prevProps.match.params.id
		) {
			// console.log(
			// 	'componentDidUpdate this.props.match.params',
			// 	this.props.match.params
			// );
			this.props.getBacklog(this.props.match.params);
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

	onUpdateCallback = updatedProjectTask => {
		if (!this.props.isDemo) {
			this.props.updateProjectTask(updatedProjectTask);
		} else {
			this.props.updateProjectTaskForDemo(updatedProjectTask);
		}
	};

	onDeleteCallback = () => {
		const { projectTasks } = this.props.backlog;
		const selectedProject = projectTasks.find(
			proj => proj.id === this.state.selectedProjectId
		);

		if (!this.props.isDemo) {
			this.props.deleteProjectTask(
				selectedProject.projectIdentifier,
				selectedProject.projectSequence
			);
		} else {
			this.props.deleteProjectTaskForDemo(
				selectedProject.projectIdentifier,
				selectedProject.projectSequence
			);
		}
		this.toggleDeleteModal();
	};

	onSetColumnCallback = columnName => {
		this.setState({ selectedColumn: columnName });
	};

	render() {
		const { projectTasks } = this.props.backlog;
		const { errors } = this.state;
		const alertIfDemo = (
			<div class='alert alert-warning alert-dismissible fade show' role='alert'>
				<strong>This is a demo!</strong> Changes to this demo will persist in
				the React-Redux state but will not be sent to the server/database. This
				means once you reload the page, the data goes back to the initial state.
				If you create an account you can save changes to server/database and
				create additional project boards.
				<button
					type='button'
					class='close'
					data-dismiss='alert'
					aria-label='Close'
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
		);

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
				}
			}

			return (
				<Fragment>
					{this.props.isDemo ? alertIfDemo : null}
					<Backlog
						projectTasks={projectTasks}
						setIdCallback={this.setSelectedProject}
						toggleAddModalCallback={this.toggleAddModal}
						toggleEditModalCallback={this.toggleUpdateModal}
						toggleDeleteModalCallback={this.toggleDeleteModal}
						onUpdateTaskCallback={this.onUpdateCallback}
						selectedColumnCallback={this.onSetColumnCallback}
					/>
				</Fragment>
			);
		};

		boardContent = boardAlgorithm(errors, projectTasks);
		const projId = this.props.isDemo ? 'TDEV' : this.props.match.params.id;

		return (
			<div className='container-background-blue'>
				<div className='container-center'>
					<AddTaskModal
						onClose={this.toggleAddModal}
						show={this.state.showAddModal}
						projectId={projId}
						selectedColumn={this.state.selectedColumn}
						isDemo={this.props.isDemo}
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
	deleteProjectTask,
	getBacklogForDemo,
	updateProjectTaskForDemo,
	deleteProjectTaskForDemo
})(ProjectBoard);
