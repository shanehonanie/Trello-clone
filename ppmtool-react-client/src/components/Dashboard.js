import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProjects } from '../actions/projectActions';
import ProjectItem from './Project/ProjectItem';

// TODO: Create Project Clickable Card
import CreateProjectButton from './Project/CreateProjectButton';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getProjects();
	}

	render() {
		const { projects } = this.props.project;

		return (
			<div className='container-center'>
				<div className='projects-dashboard'>
					<h1 className='projects-dashboard__title'>Projects</h1>
					<hr />
					<div className='projects-dashboard__list'>
						{projects.map(project => (
							<ProjectItem key={project.id} project={project} />
						))}
						<CreateProjectButton />
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
