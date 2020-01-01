import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { addProjectTask } from '../../../actions/backlogActions';

class AddTaskModal extends Component {
	state = {
		summary: '',
		acceptanceCriteria: '',
		status: '',
		priority: 0,
		dueDate: '',
		projectIdentifier: this.props.projectId,

		errors: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClose = e => {
		this.props.onClose && this.props.onClose(e);
		// console.log('this.props.onClose', this.props.onClose);
		// console.log('this.props.onClose(e)', this.props.onClose(e));
	};

	onSubmit = e => {
		// e.preventDefault();

		const newTask = {
			summary: this.state.summary,
			acceptanceCriteria: this.state.acceptanceCriteria,
			status: this.state.status,
			priority: this.state.priority,
			dueDate: this.state.dueDate
		};

		this.props.addProjectTask(
			this.state.projectIdentifier,
			newTask,
			this.props.history
		);
		this.onClose();
	};

	render() {
		const { projectId } = this.props;
		const { errors } = this.state;

		if (!this.props.show) {
			return null;
		}
		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<a
						href=''
						className='popup-task__content__close'
						onClick={this.onClose}
					>
						&times;
					</a>
					<h4 className='display-4 text-center'>Add Project Task</h4>
					<p className='lead text-center'>Project Name + Project Code</p>
					<form onSubmit={this.onSubmit}>
						<div className='form-group'>
							<input
								type='text'
								className={classnames('form-control form-control-lg', {
									'is-invalid': errors.summary
								})}
								name='summary'
								placeholder='Project Task summary'
								value={this.state.summary}
								onChange={this.onChange}
							/>
							{errors.summary && (
								<div className='invalid-feedback'>{errors.summary}</div>
							)}
						</div>
						<div className='form-group'>
							<textarea
								className='form-control form-control-lg'
								placeholder='Acceptance Criteria'
								name='acceptanceCriteria'
								value={this.state.acceptanceCriteria}
								onChange={this.onChange}
							/>
						</div>
						<h6>Due Date</h6>
						<div className='form-group'>
							<input
								type='date'
								className='form-control form-control-lg'
								name='dueDate'
								value={this.state.dueDate}
								onChange={this.onChange}
							/>
						</div>
						<div className='form-group'>
							<select
								className='form-control form-control-lg'
								name='priority'
								value={this.state.priority}
								onChange={this.onChange}
							>
								<option value={0}>Select Priority</option>
								<option value={1}>High</option>
								<option value={2}>Medium</option>
								<option value={3}>Low</option>
							</select>
						</div>

						<div className='form-group'>
							<select
								className='form-control form-control-lg'
								name='status'
								value={this.state.status}
								onChange={this.onChange}
							>
								<option value=''>Select Status</option>
								<option value='TODO'>TODO</option>
								<option value='IN_PROGRESS'>IN PROGRESS</option>
								<option value='DONE'>DONE</option>
							</select>
						</div>

						<input type='submit' className='btn btn-primary btn-block mt-4' />
					</form>
				</div>
			</div>
		);
	}
}

AddTaskModal.propTypes = {
	addProjectTask: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps, { addProjectTask })(AddTaskModal);
