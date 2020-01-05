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
		start_date: '',
		end_date: '',
		errors: {}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else return null;
	}

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
			start_date: this.state.start_date,
			end_date: this.state.end_date
		};
		this.props.createProject(newProject);

		this.resetState();
		this.onClose(e);
	};

	resetState = () => {
		this.setState({
			sprojectName: '',
			projectIdentifier: '',
			description: '',
			start_date: '',
			end_date: ''
		});
	};

	render() {
		const { errors } = this.state;

		if (!this.props.show) {
			return null;
		}
		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<h5 className='display-4 text-center'>Create Project form</h5>
					<hr />
					<form onSubmit={this.onSubmit}>
						<div className='form-group'>
							<input
								type='text'
								className={classnames('form-control form-control-lg', {
									'is-invalid': errors.projectName
								})}
								placeholder='Project Name'
								name='projectName'
								value={this.state.projectName}
								onChange={this.onChange}
							/>
							{errors.projectName && (
								<div className='invalid-feedback'>{errors.projectName}</div>
							)}
						</div>
						<div className='form-group'>
							<input
								type='text'
								className={classnames('form-control form-control-lg', {
									'is-invalid': errors.projectIdentifier
								})}
								placeholder='Unique Project ID'
								name='projectIdentifier'
								value={this.state.projectIdentifier}
								onChange={this.onChange}
							/>
							{errors.projectIdentifier && (
								<div className='invalid-feedback'>
									{errors.projectIdentifier}
								</div>
							)}
						</div>
						<div className='form-group'>
							<textarea
								className={classnames('form-control form-control-lg', {
									'is-invalid': errors.description
								})}
								placeholder='Project Description'
								name='description'
								value={this.state.description}
								onChange={this.onChange}
							/>
							{errors.description && (
								<div className='invalid-feedback'>{errors.description}</div>
							)}
						</div>
						<h6>Start Date</h6>
						<div className='form-group'>
							<input
								type='date'
								className='form-control form-control-lg'
								name='start_date'
								value={this.state.start_date}
								onChange={this.onChange}
							/>
						</div>
						<h6>Estimated End Date</h6>
						<div className='form-group'>
							<input
								type='date'
								className='form-control form-control-lg'
								name='end_date'
								value={this.state.end_date}
								onChange={this.onChange}
							/>
						</div>

						<input type='submit' className='btn btn-primary btn-block mt-4' />
					</form>
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
