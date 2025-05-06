import React, { useEffect, useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import { ADD_ICON, MORE_ICON, PENCIL_ICON, TRASH_ICON } from '../../../../../shared/application/constants/icons';
import Card from '../Card';
import { getCardsByColumnSelector } from '../../../application/selectors/cards';
import { deleteColumn } from '../../../application/slices/columns';
import { putUpdateColumnRequest } from '../../../infrastructure/api';
import FormCard from '../FormCard';
import { putMoveCard } from '../../../application/slices/cards';

const Column = ({ column }) => {
	const dispatch = useDispatch();
	const cardsData = useSelector(getCardsByColumnSelector(column?._id));
	const [showOptionsColumn, setshowOptionsColumn] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(`${column.title}`);
	const [showModalCreateCard, setShowModalCreateCard] = useState(false);
	const cardsDataIds = cardsData.map((card) => card._id);

	const handleShowOptions = () => {
		setshowOptionsColumn(!showOptionsColumn);
	};

	const handleDeleteColumn = () => {
		dispatch(deleteColumn(column?._id));
		setshowOptionsColumn(false);
	};

	const handleNameChange = async () => {
		setIsEditing(false);
		const data = { title: name };
		await putUpdateColumnRequest(column?._id, data);
	};

	const handleShowModalCreateCard = () => {
		setShowModalCreateCard(!showModalCreateCard);
	};

	// --- Drag and Drop Setup ---
	const handleCardDragEnd = (payload) => {
		const { initialIndex, targetIndex } = payload;
		// Si no hay cambios en el índice, no hacemos nada
		if (initialIndex === targetIndex) {
			console.log('No changes in card order.');
			return;
		}
		// Aquí puedes manejar el cambio de orden de las tarjetas
		const findCard = cardsData.find((card) => card.position === initialIndex);
		console.log('findCard', findCard);
		const formattedData = {
			newPosition: targetIndex,
			targetColumnId: column?._id,
		};
		dispatch(putMoveCard({ formattedData, cardId: findCard?._id }));
	};

	const [parentRef, orderedCards, setOrderedCards] = useDragAndDrop([], {
		group: 'cardsGroup',
		handleEnd: handleCardDragEnd,
	});
	// --- Fin Drag and Drop Setup ---
	useEffect(() => {
		if (cardsDataIds?.length > 0 && JSON.stringify(orderedCards) !== JSON.stringify(cardsDataIds)) {
			setOrderedCards(cardsDataIds);
		}
	}, [cardsDataIds, orderedCards, setOrderedCards]);

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
			<div className="cards-container" ref={parentRef}>
				{orderedCards?.map((card) => {
					const cardData = cardsData.find((c) => c._id === card);
					if (!cardData) return null;
					return (
						<div key={cardData._id} data-label={cardData?._id}>
							<Card card={cardData} />
						</div>
					);
				})}
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
