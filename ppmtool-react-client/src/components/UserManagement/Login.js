import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import { login } from '../../actions/securityActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.security.validToken) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.security.validToken) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const LoginRequest = {
			username: this.state.username,
			password: this.state.password
		};

		this.props.login(LoginRequest);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;
		return (
			// TODO: errors/classnames for form validation
			<div className='container-background-grey'>
				<div className='form-box form-box-login'>
					<h1 className='form-box__title'>Login</h1>
					<form onSubmit={this.onSubmit}>
						<input
							type='text'
							className={classnames('input-user-form', {
								'is-invalid': errors.username
							})}
							placeholder='Email Address'
							name='username'
							value={this.state.username}
							onChange={this.onChange}
						/>
						{errors.username && (
							<div className='invalid-feedback'>{errors.username}</div>
						)}

						<input
							type='password'
							className={classnames('input-user-form', {
								'is-invalid': errors.password
							})}
							placeholder='Password'
							name='password'
							value={this.state.password}
							onChange={this.onChange}
						/>
						{errors.password && (
							<div className='invalid-feedback'>{errors.password}</div>
						)}

						<input type='submit' value='Submit' className='submit-btn' />
					</form>
					<hr className='hr-seperator' />
					<Link to='/register' className='sign-up-link'>
						<h3>Sign up for an account</h3>
					</Link>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	security: state.security,
	errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);
