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
		create_At: '',
		errors: {}
	};

	componentDidMount() {
		// console.log('UpdateTaskModal componentDidMount', this.props.project);
	}

	// TODO: Replace with getDerivedStateFromProps & componentDidUpdate for React 17
	componentWillReceiveProps(nextProps) {
		// console.log('UpdateTaskModal nextProps.project', nextProps.project);
		// console.log('UpdateTaskModal this.props.project', this.props.project);

		if (
			nextProps.project !== this.props.project &&
			nextProps.project !== undefined
		) {
			// console.log('UpdateTaskModal nextProps.project', nextProps.project);
			// console.log('UpdateTaskModal this.props.project', this.props.project);
			// console.log(
			// 	'nextProps.project === undefined',
			// 	nextProps.project === undefined
			// );

			this.setState({
				summary: nextProps.project.summary,
				acceptanceCriteria: nextProps.project.acceptanceCriteria,
				status: nextProps.project.status,
				priority: nextProps.project.priority,
				dueDate: nextProps.project.dueDate,
				id: nextProps.project.id,
				projectSequence: nextProps.project.projectSequence,
				projectIdentifier: nextProps.project.projectIdentifier,
				create_At: nextProps.project.create_At
			});
		}

		if (nextProps.errors !== this.props.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClose = e => {
		e.preventDefault();
		this.props.onClose && this.props.onClose(e);
		// console.log('this.props.onClose', this.props.onClose);
		// console.log('this.props.onClose(e)', this.props.onClose(e));
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

	render() {
		// console.log('Check this.props.project', this.props.project);

		if (!this.props.project || this.props.project === undefined) {
			// console.log('return null inside updatetaskmodal');
			return null;
		}

		const {
			summary,
			acceptanceCriteria,
			status,
			priority,
			dueDate
			// errors
		} = this.state;

		// console.log('this.props.show', this.props.show);
		if (!this.props.show) {
			return null;
		}

		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<form onSubmit={this.onSubmit}>
						<div className='form-group'>
							<input
								type='text'
								// className={classnames('form-control form-control-lg', {
								// 	'is-invalid': errors.summary
								// })}
								name='summary'
								placeholder='Project Task summary'
								value={summary}
								onChange={this.onChange}
							/>
							{/* {errors.summary && (
								<div className='invalid-feedback'>{errors.summary}</div>
							)} */}
						</div>
						<div className='form-group'>
							<textarea
								className='form-control form-control-lg'
								placeholder='Acceptance Criteria'
								name='acceptanceCriteria'
								value={acceptanceCriteria}
								onChange={this.onChange}
							/>
						</div>
						<h6>Due Date</h6>
						<div className='form-group'>
							<input
								type='date'
								className='form-control form-control-lg'
								name='dueDate'
								value={dueDate}
								onChange={this.onChange}
							/>
						</div>
						<div className='form-group'>
							<select
								className='form-control form-control-lg'
								name='priority'
								value={priority}
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
								value={status}
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

export default UpdateTaskModal;
