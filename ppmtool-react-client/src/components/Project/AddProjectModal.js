import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { createProject } from '../../actions/projectActions';

export class AddProjectModal extends Component {
	state = {
		projectName: '',
		projectIdentifier: '',
		description: '',
		startDate: '',
		dueDate: '',
		touched: {
			projectName: false,
			projectIdentifier: false,
			description: false,
			startDate: false,
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

		const newProject = {
			projectName: this.state.projectName,
			projectIdentifier: this.state.projectIdentifier,
			description: this.state.description,
			startDate: this.state.startDate,
			dueDate: this.state.dueDate
		};
		this.props.createProject(newProject);

		this.resetState();
		this.onClose(e);
	};

	resetState = () => {
		this.setState({
			projectName: '',
			projectIdentifier: '',
			description: '',
			startDate: '',
			dueDate: '',
			touched: {
				projectName: false,
				projectIdentifier: false,
				description: false,
				startDate: false,
				dueDate: false
			}
		});
	};

	validate = (
		projectName,
		projectIdentifier,
		description,
		startDate,
		dueDate
	) => {
		return {
			projectName: projectName.length === 0 ? 'Enter 1 or more characters' : '',
			projectIdentifier:
				projectIdentifier.length < 4 || projectIdentifier.length > 5
					? 'Enter 4 or 5 characters'
					: '',
			description: description.length === 0 ? 'Enter 1 or more characters' : '',
			startDate: startDate === '' ? 'Enter a valid date' : '',
			dueDate: dueDate === '' ? 'Enter a valid date' : ''
		};
	};

	render() {
		if (!this.props.show) {
			return null;
		}

		const {
			projectName,
			projectIdentifier,
			description,
			startDate,
			dueDate
		} = this.state;

		const errors = this.validate(
			projectName,
			projectIdentifier,
			description,
			startDate,
			dueDate
		);

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
						<h3 className='row mt-4 justify-content-center'>Add Project</h3>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<h6>Project Name</h6>
								<input
									type='text'
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('projectName')
											? errors.projectName
											: null
									})}
									placeholder='Project Name'
									name='projectName'
									value={projectName}
									onChange={this.onChange}
									onBlur={this.handleBlur('projectName')}
								/>
								{shouldMarkError('projectName') && errors.projectName && (
									<div className='invalid-feedback'>{errors.projectName}</div>
								)}
							</div>

							<div className='form-group'>
								<h6>Project ID</h6>
								<input
									type='text'
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('projectIdentifier')
											? errors.projectIdentifier
											: null
									})}
									placeholder='Enter 4 or 5 characters'
									name='projectIdentifier'
									value={projectIdentifier}
									onChange={this.onChange}
									onBlur={this.handleBlur('projectIdentifier')}
								/>
								{shouldMarkError('projectIdentifier') &&
									errors.projectIdentifier && (
										<div className='invalid-feedback'>
											{errors.projectIdentifier}
										</div>
									)}
							</div>

							<div className='form-group'>
								<h6>Description</h6>
								<textarea
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('description')
											? errors.description
											: null
									})}
									placeholder='Project Description'
									name='description'
									value={description}
									onChange={this.onChange}
									onBlur={this.handleBlur('description')}
								/>
								{shouldMarkError('description') && errors.description && (
									<div className='invalid-feedback'>{errors.description}</div>
								)}
							</div>

							<div className='form-group'>
								<h6>Start Date</h6>
								<input
									type='date'
									className={classnames('form-control form-control-lg', {
										'is-invalid': shouldMarkError('startDate')
											? errors.startDate
											: null
									})}
									name='startDate'
									value={startDate}
									onChange={this.onChange}
									onBlur={this.handleBlur('startDate')}
								/>
								{shouldMarkError('startDate') && errors.startDate && (
									<div className='invalid-feedback'>{errors.startDate}</div>
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

AddProjectModal.propTypes = {
	createProject: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps, { createProject })(AddProjectModal);
