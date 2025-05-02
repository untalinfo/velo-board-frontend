import React from 'react';
import './Card.scss';
import { ADD_ICON, TRASH_ICON } from '../../../../../shared/application/constants/icons';

const Card = () => {
	return (
		<section className="container-card">
			<header className="header-card-container">
				<h2>title card</h2>
			</header>
			<div className="tags-contianer">
				<div className="tag-wrapper">
					<p>Design</p>
				</div>
				<div className="add-tag">
					<i className={ADD_ICON}></i>
					<p>Tag</p>
				</div>
			</div>
			<div className="body-card">
				<p>Development task assign for the product page in task it project.</p>
			</div>
			<footer className="footer-card">
				<i className={TRASH_ICON}></i>
			</footer>
		</section>
	);
};

export default Card;
