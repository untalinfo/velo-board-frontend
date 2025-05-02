import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { ADD_ICON, PENCIL_ICON, TRASH_ICON } from '../../../../../shared/application/constants/icons';

const Card = ({ card }) => {
	return (
		<section className="container-card">
			<header className="header-card-container">
				<h3>{card?.title}</h3>
			</header>
			<div className="tags-contianer">
				{card?.tags?.map((tag) => (
					<div key={tag} className="tag-wrapper">
						<p>{tag}</p>
					</div>
				))}
				<div className="add-tag">
					<i className={ADD_ICON}></i>
					<p>Tag</p>
				</div>
			</div>
			<div className="body-card">
				<p>{card?.description}</p>
			</div>
			<footer className="footer-card">
				<i className={PENCIL_ICON}></i>
				<i className={TRASH_ICON}></i>
			</footer>
		</section>
	);
};

Card.propTypes = {
	card: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		tags: PropTypes.arrayOf(PropTypes.string),
	}),
};

export default Card;
