import React, { useEffect, useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Column.scss';
import {
	ADD_ICON,
	DRAG_ICON,
	MORE_ICON,
	PENCIL_ICON,
	TRASH_ICON,
} from '../../../../../shared/application/constants/icons';
import Card from '../Card';
import { getCardsByColumnSelector } from '../../../application/selectors/cards';
import { deleteColumn } from '../../../application/slices/columns';
import { putUpdateColumnRequest } from '../../../infrastructure/api';
import FormCard from '../FormCard';
import { putMoveCard } from '../../../application/slices/cards';
import { getColumnByIdSelector } from '../../../application/selectors/columns';

const Column = ({ columnId }) => {
	const dispatch = useDispatch();
	const column = useSelector(getColumnByIdSelector(columnId));
	const cardsFromSelector = useSelector(getCardsByColumnSelector(columnId));
	const cards = React.useMemo(() => cardsFromSelector || [], [cardsFromSelector]);
	const cardsData = React.useMemo(() => cards, [cards]);
	const [showOptionsColumn, setshowOptionsColumn] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(`${column?.title}`);
	const [showModalCreateCard, setShowModalCreateCard] = useState(false);

	const handleShowOptions = () => {
		setshowOptionsColumn(!showOptionsColumn);
	};

	const handleDeleteColumn = () => {
		dispatch(deleteColumn(columnId));
		setshowOptionsColumn(false);
	};

	const handleNameChange = async () => {
		setIsEditing(false);
		const data = { title: name };
		await putUpdateColumnRequest(columnId, data);
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
		// Manejar el cambio de orden de las tarjetas
		const findCard = cardsData.find((card) => card.position === initialIndex);
		const formattedData = {
			newPosition: targetIndex,
			targetColumnId: columnId,
		};
		dispatch(putMoveCard({ formattedData, cardId: findCard?._id }));
	};

	const [cardListRef, orderedCards, setOrderedCards] = useDragAndDrop(cardsData, {
		group: 'sharedCardsGroup',
		handleEnd: handleCardDragEnd,
	});
	// --- Fin Drag and Drop Setup ---
	useEffect(() => {
		if (cardsData && JSON.stringify(orderedCards) !== JSON.stringify(cardsData)) {
			setOrderedCards(cardsData);
		}
	}, [cardsData, orderedCards, setOrderedCards]);

	return (
		<section className="container-column">
			<header className="header-card-container">
				<div className="left-container">
					<i className={`kanban-handle ${DRAG_ICON}`}></i>
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
			<div className="cards-container" ref={cardListRef} data-columnid={columnId}>
				{orderedCards?.map((card) => {
					if (!card) return null;
					return (
						<div key={card._id} data-label={card?._id}>
							<Card card={card} />
						</div>
					);
				})}
			</div>
			<div className="add-card-container" onClick={handleShowModalCreateCard}>
				<i className={ADD_ICON}></i>
				<p>Add card</p>
			</div>
			{showModalCreateCard && (
				<FormCard
					isOpen={showModalCreateCard}
					onClose={() => setShowModalCreateCard(!showModalCreateCard)}
					columnId={columnId}
				/>
			)}
		</section>
	);
};

Column.propTypes = {
	columnId: PropTypes.string.isRequired,
};

export default Column;
