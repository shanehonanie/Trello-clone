import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteProject, clearProject } from '../../actions/projectActions';

class DeleteProjectModal extends Component {
	onClose = e => {
		e.preventDefault();
		this.props.clearProject();
		this.props.onClose && this.props.onClose(e);
	};

	onDelete = e => {
		e.preventDefault();
		// console.log(
		// 	'DeleteProjectModal.js onDelete this.props.project',
		// 	this.props.project
		// );
		this.props.deleteProject(this.props.project);
		this.props.clearProject();
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

DeleteProjectModal.propTypes = {
	deleteProject: PropTypes.func.isRequired,
	clearProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	project: state.project.project
});

export default connect(mapStateToProps, { deleteProject, clearProject })(
	DeleteProjectModal
);
