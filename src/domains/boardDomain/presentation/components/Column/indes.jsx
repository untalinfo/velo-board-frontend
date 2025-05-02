import React from 'react';
import './Column.scss';
import { ADD_ICON, MORE_ICON } from '../../../../../shared/application/constants/icons';
import Card from '../Card';

const Column = () => {
	return (
		<section className="container-column">
			<header className="header-card-container">
				<div className="left-container">
					<div className="identifier" />
					<p>Name of list</p>
				</div>
				<i className={MORE_ICON}></i>
			</header>
			<div>
				<Card />
			</div>
			<div className="add-card-container">
				<i className={ADD_ICON}></i>
				<p>Add card</p>
			</div>
		</section>
	);
};

export default Column;
