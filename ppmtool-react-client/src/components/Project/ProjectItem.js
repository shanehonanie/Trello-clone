import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';

class ProjectItem extends Component {
	redirectToUpdateProject = project => {
		this.props.history.push(`/updateProject/${project.projectIdentifier}`);
	};

	render() {
		const { project } = this.props;
		return (
			<Link to={`/projectBoard/${project.projectIdentifier}`}>
				<div className='project-card card-2'>
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
								<button onClick={this.redirectToUpdateProject}>
									Edit Info
								</button>
							</li>
							<li
								onClick={() =>
									this.props.deleteProject(project.projectIdentifier)
								}
							>
								<button>Delete Project</button>
							</li>
						</ul>
					</div>
				</div>
			</Link>
		);
	}
}

ProjectItem.propTypes = {
	deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(ProjectItem);
