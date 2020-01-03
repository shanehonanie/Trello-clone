import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProject } from '../../actions/projectActions';

class ProjectItem extends Component {
	redirectToProjectBacklog = () => {
		console.log('this.props.project', this.props.project);
		this.props.history.push(
			`/projectBoard/${this.props.project.projectIdentifier}`
		);
	};

	onEditClick = e => {
		e.stopPropagation();
		this.props.setProject(this.props.project);
		this.props.toggleUpdateModalCallback();
	};

	onDeleteClick = e => {
		e.stopPropagation();
		this.props.setProject(this.props.project);
		this.props.toggleDeleteModalCallback();
	};

	render() {
		const { project } = this.props;
		return (
			<div
				className='project-card card-2'
				onClick={this.redirectToProjectBacklog}
			>
				<div className='project-card__id-section'>
					{project.projectIdentifier}
				</div>
				<div className='project-card__info-section'>
					<h1>{project.projectName}</h1>
					<p>{project.description}</p>
				</div>
				<div className='project-card__button-section'>
					<ul>
						<li>
							<button onClick={this.onEditClick}>Edit Info</button>
						</li>
						<li onClick={this.onDeleteClick}>
							<button>Delete Project</button>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

ProjectItem.propTypes = {
	setProject: PropTypes.func.isRequired
};

export default withRouter(connect(null, { setProject })(ProjectItem));
