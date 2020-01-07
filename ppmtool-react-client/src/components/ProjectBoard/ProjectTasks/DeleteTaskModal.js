import React, { Component } from 'react';

export class DeleteTaskModal extends Component {
	onClose = e => {
		e.preventDefault();
		this.props.onClose && this.props.onClose(e);
	};

	onDelete = e => {
		e.preventDefault();
		this.props.onDeleteTaskCallback();
		this.props.setIdCallback(-1); //Invalidate selected project
		this.onClose(e);
	};

	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className='popup-task'>
				<div className='popup-task__content'>
					<button className='popup-task__content__close' onClick={this.onClose}>
						&times;
					</button>
					<div className='container'>
						<h3 className='row mt-4 justify-content-center'>Delete Task </h3>
						<h5 className='row mt-4 justify-content-center'>
							Are you sure you want to delete?
						</h5>
						<div className='row justify-content-center mt-4'>
							<button
								className='btn btn-danger mr-3 btn-lg'
								onClick={this.onDelete}
							>
								Delete
							</button>
							<button
								className='btn btn-secondary btn-lg'
								onClick={this.onClose}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// TODO Add proptypes for delete callback

export default DeleteTaskModal;
