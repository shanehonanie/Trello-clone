import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';

class Header extends Component {
	onLogout = () => {
		this.props.logout();
		window.location.href = '/';
	};

	render() {
		const { validToken, user } = this.props.security;

		const userIsNotAuthenticated = (
			<header className='header'>
				<Link to='/'>
					<h2 className='header__title'>Trello Clone</h2>
				</Link>
				<div className='nav-links'>
					<Link to='/login'>
						<button className='nav-links__login btn__sign-up'>Log In</button>
					</Link>

					<Link to='/register'>
						<button className='nav-links__sign-up btn__login'>Sign Up</button>
					</Link>
				</div>
			</header>
		);

		// TODO: Update Logged in Links
		const userIsAuthenticated = (
			<div className='header-authenticated'>
				<div className='header-authenticated__left'>
					<Link to='/dashboard'>
						<div className='header-authenticated__left__home header-icon'>
							<i className='fas fa-home' />
						</div>
					</Link>

					<button className='header-authenticated__left__board header-icon'>
						<i className='fas fa-list'>
							<span className='header-authenticated__left__board__text'>
								Boards
							</span>
						</i>
					</button>
				</div>

				<div className='header-authenticated__middle'>
					<div className='header-authenticated__middle__title'>
						<Link to='/dashboard'>
							<h2>Trello Clone</h2>
						</Link>
					</div>
				</div>

				<div className='header-authenticated__right'>
					<div className='dropdown'>
						<button
							className=' header-authenticated__right__user header-icon'
							type='button'
							id='dropdownMenuButton'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							<i className='fas fa-user' />
						</button>
						<div
							className='dropdown-menu dropdown-menu-right'
							aria-labelledby='dropdownMenuButton'
						>
							<h3 className='dropdown-header'>
								{this.props.security.user.username}
							</h3>
							<div className='dropdown-divider'></div>
							<Link
								to='/logout'
								className='dropdown-item'
								onClick={() => this.onLogout()}
							>
								Logout
							</Link>
						</div>
					</div>

					{/* <div className='header-authenticated__right__user header-icon'>
						<i className='fas fa-user' />
					</div>
					<Link to='/logout' onClick={() => this.onLogout()}>
						Logout
					</Link> */}
				</div>
			</div>
		);

		let header;

		if (validToken && user) {
			header = userIsAuthenticated;
		} else {
			header = userIsNotAuthenticated;
		}

		return header;
	}
}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	security: state.security
});

export default connect(mapStateToProps, { logout })(Header);
