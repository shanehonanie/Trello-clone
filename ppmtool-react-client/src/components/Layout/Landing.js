import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectBoard from '../ProjectBoard/ProjectBoard';

class Landing extends Component {
	componentDidMount() {
		if (this.props.security.validToken) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			// <div>
			// 	<h1>TODO: Add Demo</h1>
			// </div>
			<ProjectBoard isDemo={true} />
		);
	}
}

Landing.propTypes = {
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	security: state.security
});

export default connect(mapStateToProps)(Landing);
