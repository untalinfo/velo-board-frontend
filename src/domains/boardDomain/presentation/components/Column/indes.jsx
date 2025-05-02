import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import { ADD_ICON, MORE_ICON } from '../../../../../shared/application/constants/icons';
import Card from '../Card';
import { getCardsByColumnSelector } from '../../../application/selectors/cards';

const Column = ({ column }) => {
	const cardsData = useSelector(getCardsByColumnSelector(column?._id));

	return (
		<section className="container-column">
			<header className="header-card-container">
				<div className="left-container">
					<div className="identifier" />
					<p>{column?.title}</p>
				</div>
				<i className={MORE_ICON}></i>
			</header>
			<div className="cards-container">
				{cardsData?.map((card) => (
					<Card key={card._id} card={card} />
				))}
			</div>
			<div className="add-card-container">
				<i className={ADD_ICON}></i>
				<p>Add card</p>
			</div>
		</section>
	);
};

Column.propTypes = {
	column: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		position: PropTypes.number,
	}),
};

export default Column;
