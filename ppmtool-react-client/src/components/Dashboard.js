import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProjects } from '../actions/projectActions';
import ProjectItem from './Project/ProjectItem';
import AddProjectModal from './Project/AddProjectModal';

class Dashboard extends Component {
	state = {
		showAddProjectModal: false,
		showUpdateProjectModal: false,
		showDeleteProjectModal: false,
		selectedProjectId: -1
	};

	componentDidMount() {
		this.props.getProjects();
	}

	toggleAddProjectModal = e => {
		this.setState({
			showAddProjectModal: !this.state.showAddProjectModal
		});
	};

	render() {
		const { projects } = this.props.project;

		return (
			<div className='container-background-grey'>
				<div className='container-center'>
					<div className='projects-dashboard'>
						<AddProjectModal
							onClose={this.toggleAddProjectModal}
							show={this.state.showAddProjectModal}
						/>
						<h1 className='projects-dashboard__title'>Projects</h1>
						<hr />
						<div className='projects-dashboard__list'>
							{projects.map(project => (
								<ProjectItem key={project.id} project={project} />
							))}
							<button
								className='create-project-card card-2'
								onClick={this.toggleAddProjectModal}
							>
								<div className='create-project-card__text'>
									<i className='fas fa-plus'> Create New Project</i>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	project: PropTypes.object.isRequired,
	getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
