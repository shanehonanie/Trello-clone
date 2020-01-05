import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { createNewUser } from '../../actions/securityActions';

class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			fullName: '',
			password: '',
			confirmPassword: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.security.validToken) {
			this.props.history.push('/dashboard');
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else return null;
	}

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			username: this.state.username,
			fullName: this.state.fullName,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};

		this.props.createNewUser(newUser, this.props.history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;
		return (
			<div className='container-background-grey'>
				<div className='form-box form-box-sign-up'>
					<h1 className='form-box__title'>Create an Account</h1>
					<form onSubmit={this.onSubmit}>
						<input
							type='text'
							className={classnames('input-user-form', {
								'is-invalid': errors.fullName
							})}
							placeholder='Full Name'
							name='fullName'
							value={this.state.fullName}
							onChange={this.onChange}
						/>
						{errors.fullName && (
							<div className='invalid-feedback'>{errors.fullName}</div>
						)}

						<input
							type='text'
							className={classnames('input-user-form', {
								'is-invalid': errors.username
							})}
							placeholder='Email Address (Username)'
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

						<input
							type='password'
							className={classnames('input-user-form', {
								'is-invalid': errors.confirmPassword
							})}
							placeholder='Confirm Password'
							name='confirmPassword'
							value={this.state.confirmPassword}
							onChange={this.onChange}
						/>
						{errors.confirmPassword && (
							<div className='invalid-feedback'>{errors.confirmPassword}</div>
						)}

						<input type='submit' value='Submit' className='submit-btn' />
					</form>
					<hr className='hr-seperator' />
					<Link to='/login' className='sign-up-link'>
						<h3>Already have an account? Log in</h3>
					</Link>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	createNewUser: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	security: state.security
});
export default connect(mapStateToProps, { createNewUser })(Register);
