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
					<h1>Delete Modal</h1>
					<h3>Are you sure you want to delete?</h3>
					<button onClick={this.onDelete}>Delete</button>
					<button onClick={this.onClose}>Close</button>
				</div>
			</div>
		);
	}
}

// TODO Add proptypes for delete callback

export default DeleteTaskModal;
