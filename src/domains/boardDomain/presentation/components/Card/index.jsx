import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Card.scss';
import { ADD_ICON, PENCIL_ICON, TRASH_ICON } from '../../../../../shared/application/constants/icons';
import { deleteCard } from '../../../application/slices/cards';
import FormCard from '../FormCard';

const Card = ({ card }) => {
	const dispatch = useDispatch();
	const [showModalEdit, setshowModalEdit] = useState(false);
	const defaultValues = {
		title: card?.title,
		description: card?.description,
		tags: card?.tags,
	};

	const handleDeleteCard = () => {
		dispatch(deleteCard(card?._id));
	};
	const handleShowModalEdit = () => {
		setshowModalEdit(!showModalEdit);
	};
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
				<div className="add-tag" onClick={handleShowModalEdit}>
					<i className={ADD_ICON}></i>
					<p>Tag</p>
				</div>
			</div>
			<div className="body-card">
				<p>{card?.description}</p>
			</div>
			<footer className="footer-card">
				<i className={`${PENCIL_ICON} icon`} onClick={handleShowModalEdit}></i>
				<i className={`${TRASH_ICON} icon`} onClick={handleDeleteCard}></i>
			</footer>
			<FormCard
				isOpen={showModalEdit}
				onClose={handleShowModalEdit}
				defaultValues={defaultValues}
				isEdit={true}
				cardId={card?._id}
			/>
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
