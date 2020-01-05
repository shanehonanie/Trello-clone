import React, { Component } from 'react';
import classnames from 'classnames';

class UpdateTaskModal extends Component {
	state = {
		summary: '',
		acceptanceCriteria: '',
		status: '',
		priority: '',
		dueDate: '',
		id: '',
		projectSequence: '',
		projectIdentifier: '',
		create_At: ''
	};

	componentDidUpdate(prevProps) {
		if (
			prevProps.project !== this.props.project &&
			this.props.project !== undefined
		) {
			this.setState({
				summary: this.props.project.summary || '',
				acceptanceCriteria: this.props.project.acceptanceCriteria || '',
				status: this.props.project.status || '',
				priority: this.props.project.priority || '',
				dueDate: this.props.project.dueDate || '',
				id: this.props.project.id || '',
				projectSequence: this.props.project.projectSequence || '',
				projectIdentifier: this.props.project.projectIdentifier || '',
				create_At: this.props.project.create_At || ''
			});
		}
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

		const updatedProjectTask = {
			id: this.state.id,
			projectSequence: this.state.projectSequence,
			summary: this.state.summary,
			acceptanceCriteria: this.state.acceptanceCriteria,
			status: this.state.status,
			priority: this.state.priority,
			dueDate: this.state.dueDate,
			projectIdentifier: this.state.projectIdentifier,
			create_At: this.state.create_At
		};

		this.props.onUpdateTaskCallback(updatedProjectTask);
		this.onClose(e);
	};

	validate = (summary, dueDate) => {
		return {
			summary: summary.length === 0 ? 'Enter 1 or more characters' : '',
			dueDate: dueDate === '' ? 'Enter a valid date' : ''
		};
	};

	render() {
		if (!this.props.project || this.props.project === undefined) {
			return null;
		}

		const { summary, status, dueDate } = this.state;

		if (!this.props.show) {
			return null;
		}

		const errors = this.validate(this.state.summary, this.state.dueDate);
		const isEnabled = !Object.keys(errors).some(x => errors[x] !== '');

		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<div className='container'>
						<h1>Update Task Modal</h1>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<h6 className='mt-3'>Description</h6>
								<textarea
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.summary
									})}
									name='summary'
									placeholder='Summary...'
									value={summary}
									onChange={this.onChange}
								/>
								{errors.summary && (
									<div className='invalid-feedback'>{errors.summary}</div>
								)}
							</div>

							<div className='form-group'>
								<h6 className='mt-3'>Due Date</h6>
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
							</div>

							<div className='form-group'>
								<h6 className='mt-3'>Status</h6>
								<select
									className='form-control form-control-lg'
									name='status'
									value={status}
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

export default UpdateTaskModal;
