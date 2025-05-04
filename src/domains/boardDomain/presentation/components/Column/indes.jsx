import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import { ADD_ICON, MORE_ICON, PENCIL_ICON, TRASH_ICON } from '../../../../../shared/application/constants/icons';
import Card from '../Card';
import { getCardsByColumnSelector } from '../../../application/selectors/cards';
import { deleteColumn } from '../../../application/slices/columns';
import { putUpdateColumnRequest } from '../../../infrastructure/api';
import FormCard from '../FormCard';

const Column = ({ column }) => {
	const dispatch = useDispatch();
	const cardsData = useSelector(getCardsByColumnSelector(column?._id));
	const [showOptionsColumn, setshowOptionsColumn] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(`${column.title}`);
	const [showModalCreateCard, setShowModalCreateCard] = useState(false);

	const handleShowOptions = () => {
		setshowOptionsColumn(!showOptionsColumn);
	};

	const handleDeleteColumn = () => {
		dispatch(deleteColumn(column?._id));
		setshowOptionsColumn(false);
	};

	const handleNameChange = async () => {
		setIsEditing(false);
		// const updatedTier =
		const data = { title: name };
		await putUpdateColumnRequest(column?._id, data);
		// if (updatedTier) {
		// 	toast.success('Tier name updated successfully');
		// } else {
		// 	toast.error('Failed to update tier name, duplicate name found');
		// 	setName(tier.name);
		// }
	};

	const handleShowModalCreateCard = () => {
		setShowModalCreateCard(!showModalCreateCard);
	};

	return (
		<section className="container-column">
			<header className="header-card-container">
				<div className="left-container">
					<div className="identifier" />
					{isEditing ? (
						<input
							className="input-name-column"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={handleNameChange}
							onKeyDown={(e) => e.key === 'Enter' && handleNameChange()}
							autoFocus
						/>
					) : (
						<div className="name-column-container">
							<span className="name-column">{name}</span>
							<button onClick={() => setIsEditing(true)} className="button-edit">
								<i className={PENCIL_ICON} />
							</button>
						</div>
					)}
				</div>
				<div className="column-options-container">
					<i className={MORE_ICON} onClick={handleShowOptions}></i>
					{showOptionsColumn && (
						<div className="options-list-container">
							<div className="option-item" onClick={handleDeleteColumn}>
								<p>Delete List</p>
								<i className={TRASH_ICON}></i>
							</div>
						</div>
					)}
				</div>
			</header>
			<div className="cards-container">
				{cardsData?.map((card) => (
					<Card key={card._id} card={card} />
				))}
			</div>
			<div className="add-card-container" onClick={handleShowModalCreateCard}>
				<i className={ADD_ICON}></i>
				<p>Add card</p>
			</div>
			<FormCard
				isOpen={showModalCreateCard}
				onClose={() => setShowModalCreateCard(!showModalCreateCard)}
				columnId={column._id}
			/>
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
