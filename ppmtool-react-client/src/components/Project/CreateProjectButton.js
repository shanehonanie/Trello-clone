import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CreateProjectButton = () => {
	return (
		// <div className='create-project-card card'>
		<Link to='/addProject' className='create-project-card card-2'>
			<div className='create-project-card__text'>
				<i className='fas fa-plus'> Create New Project</i>
			</div>{' '}
		</Link>
		// </div>
	);
};

export default CreateProjectButton;
