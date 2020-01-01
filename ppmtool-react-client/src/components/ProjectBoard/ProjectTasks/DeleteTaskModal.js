import React, { Component } from 'react';

export class DeleteTaskModal extends Component {
	onClose = e => {
		this.props.onClose && this.props.onClose(e);
	};
	render() {
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
					<h1>Delete Modal Update</h1>
					<h3>Are you sure you want to delete?</h3>
					<a href='' onClick={this.props.onDeleteTaskCallback}>
						Delete
					</a>
					<a href='' onClick={this.onClose}>
						Close
					</a>
				</div>
			</div>
		);
	}
}

// TODO Add proptypes for delete callback

export default DeleteTaskModal;
