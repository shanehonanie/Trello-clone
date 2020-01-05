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
		start_date: '',
		end_date: '',
		errors: {}
	};

	componentDidUpdate(prevProps) {
		if (prevProps.project !== this.props.project) {
			this.setState({
				id: this.props.project.id,
				projectName: this.props.project.projectName,
				projectIdentifier: this.props.project.projectIdentifier,
				description: this.props.project.description,
				start_date: this.props.project.start_date,
				end_date: this.props.project.end_date
			});
		}
	}

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
		this.props.clearProject();
		this.props.onClose && this.props.onClose(e);
	};

	onSubmit = e => {
		e.preventDefault();

		const updatedProject = {
			id: this.state.id,
			projectName: this.state.projectName,
			projectIdentifier: this.state.projectIdentifier,
			description: this.state.description,
			start_date: this.state.start_date,
			end_date: this.state.end_date
		};

		this.props.updateProject(updatedProject);
		this.onClose(e);
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
					<h1>Update Modal</h1>
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
								className='form-control form-control-lg'
								placeholder='Unique Project ID'
								name='projectIdentifier'
								value={this.state.projectIdentifier}
								onChange={this.onChange}
								disabled
							/>
						</div>
						<div className='form-group'>
							<textarea
								className={classnames('form-control form-control-lg', {
									'is-invalid': errors.description
								})}
								placeholder='Project Description'
								name='description'
								onChange={this.onChange}
								value={this.state.description}
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
