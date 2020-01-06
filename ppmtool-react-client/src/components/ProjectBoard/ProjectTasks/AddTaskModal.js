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
		touched: {
			summary: false,
			dueDate: false
		}
	};

	handleBlur = field => e => {
		this.setState({
			touched: { ...this.state.touched, [field]: true }
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClose = e => {
		e.preventDefault();
		this.props.onClose && this.props.onClose(e);
	};

	onSubmit = e => {
		e.preventDefault();

		const newTask = {
			summary: this.state.summary,
			acceptanceCriteria: this.state.acceptanceCriteria,
			status: this.state.status,
			priority: this.state.priority,
			dueDate: this.state.dueDate
		};

		this.props.addProjectTask(this.state.projectIdentifier, newTask);
		this.resetState();
		this.onClose(e);
	};

	resetState = () => {
		this.setState({
			summary: '',
			acceptanceCriteria: '',
			status: '',
			priority: 0,
			dueDate: '',
			projectIdentifier: this.props.projectId,
			touched: {
				summary: false,
				dueDate: false
			}
		});
	};

	validate = (summary, dueDate) => {
		return {
			summary: summary.length === 0 ? 'Enter 1 or more characters' : '',
			dueDate: dueDate === '' ? 'Enter a valid date' : ''
		};
	};

	render() {
		const { summary, dueDate } = this.state;

		if (!this.props.show) {
			return null;
		}

		const errors = this.validate(summary, dueDate);
		const isEnabled = !Object.keys(errors).some(x => errors[x] !== '');

		const shouldMarkError = field => {
			const hasError = errors[field] !== '';
			const shouldShow = this.state.touched[field];

			return hasError ? shouldShow : false;
		};

		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<div className='container'>
						<h3 className='row mt-4 justify-content-center'>Add Task </h3>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<h6>Description</h6>
								<textarea
									type='text'
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('summary')
											? errors.summary
											: null
									})}
									name='summary'
									placeholder='Description...'
									value={summary}
									onChange={this.onChange}
									onBlur={this.handleBlur('summary')}
								/>
								{shouldMarkError('summary') && errors.summary && (
									<div className='invalid-feedback'>{errors.summary}</div>
								)}
							</div>

							<div className='form-group'>
								<h6>Due Date</h6>
								<input
									type='date'
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('dueDate')
											? errors.dueDate
											: null
									})}
									name='dueDate'
									value={dueDate}
									onChange={this.onChange}
									onBlur={this.handleBlur('dueDate')}
								/>
								{shouldMarkError('dueDate') && errors.dueDate && (
									<div className='invalid-feedback'>{errors.dueDate}</div>
								)}
							</div>

							<div className='form-group'>
								<select
									className='form-control form-control-lg'
									name='status'
									value={this.state.status}
									onChange={this.onChange}
								>
									<option value='TODO'>TODO</option>
									<option value='IN_PROGRESS'>IN PROGRESS</option>
									<option value='DONE'>DONE</option>
								</select>
							</div>

							<input
								type='submit'
								className='btn btn-primary btn-block'
								disabled={!isEnabled}
							/>
						</form>
					</div>
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
