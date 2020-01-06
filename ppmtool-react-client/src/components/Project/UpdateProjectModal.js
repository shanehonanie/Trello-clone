import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { updateProject, clearProject } from '../../actions/projectActions';

class UpdateProjectModal extends Component {
	state = {
		id: '',
		projectName: '',
		projectIdentifier: '',
		description: '',
		startDate: '',
		dueDate: ''
	};

	componentDidUpdate(prevProps) {
		if (prevProps.project !== this.props.project) {
			this.setState({
				id: this.props.project.id || '',
				projectName: this.props.project.projectName || '',
				projectIdentifier: this.props.project.projectIdentifier || '',
				description: this.props.project.description || '',
				startDate: this.props.project.startDate || '',
				dueDate: this.props.project.dueDate || ''
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClose = e => {
		e.preventDefault();
		this.props.clearProject();
		this.props.onClose && this.props.onClose(e);
	};

	onSubmit = e => {
		e.preventDefault();

		const updatedProject = {
			id: this.state.id,
			projectName: this.state.projectName,
			projectIdentifier: this.state.projectIdentifier,
			description: this.state.description
			// startDate: this.state.startDate,
			// dueDate: this.state.dueDate
		};

		this.props.updateProject(updatedProject);
		this.onClose(e);
	};

	validate = (projectName, description) => {
		return {
			projectName: projectName.length === 0 ? 'Enter 1 or more characters' : '',
			description: description.length === 0 ? 'Enter 1 or more characters' : ''
			// startDate: startDate === '' ? 'Enter a valid date' : '',
			// dueDate: dueDate === '' ? 'Enter a valid date' : ''
		};
	};

	render() {
		if (!this.props.show) {
			return null;
		}

		const {
			projectName,
			projectIdentifier,
			description
			// startDate,
			// dueDate
		} = this.state;
		// const errors = this.validate(projectName, description, startDate, dueDate);
		const errors = this.validate(projectName, description);
		const isEnabled = !Object.keys(errors).some(x => errors[x] !== '');

		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<div className='container'>
						<h3 className='row mt-4 justify-content-center'>Add Project </h3>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<h6>Project Name</h6>
								<input
									type='text'
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.projectName
									})}
									placeholder='Project Name'
									name='projectName'
									value={projectName}
									onChange={this.onChange}
								/>
								{errors.projectName && (
									<div className='invalid-feedback'>{errors.projectName}</div>
								)}
							</div>

							<div className='form-group'>
								<h6>Project ID</h6>
								<input
									type='text'
									className='form-control form-control-lg'
									placeholder='Unique Project ID'
									name='projectIdentifier'
									value={projectIdentifier}
									onChange={this.onChange}
									disabled
								/>
							</div>

							<div className='form-group'>
								<h6>Description</h6>
								<textarea
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.description
									})}
									placeholder='Project Description'
									name='description'
									onChange={this.onChange}
									value={description}
								/>
								{errors.description && (
									<div className='invalid-feedback'>{errors.description}</div>
								)}
							</div>

							{/* <div className='form-group'>
								<h6>Start Date</h6>
								<input
									type='date'
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.startDate
									})}
									name='startDate'
									value={startDate}
									onChange={this.onChange}
								/>
								{errors.startDate && (
									<div className='invalid-feedback'>{errors.startDate}</div>
								)}
							</div> */}

							{/* <div className='form-group'>
								<h6>Estimated End Date</h6>
								<input
									type='date'
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.dueDate
									})}
									name='dueDate'
									value={dueDate}
									onChange={this.onChange}
								/>
								{errors.dueDate && (
									<div className='invalid-feedback'>{errors.dueDate}</div>
								)}
							</div> */}

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

UpdateProjectModal.propTypes = {
	updateProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	project: state.project.project,
	errors: state.errors
});

export default connect(mapStateToProps, { updateProject, clearProject })(
	UpdateProjectModal
);
