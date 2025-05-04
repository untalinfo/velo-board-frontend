import { createSelector } from '@reduxjs/toolkit';

export const cardsState = (state) => state.cards;

export const getcardsByBoardSelector = createSelector(cardsState, (cards) => {
	return cards?.cardsArray;
});

export const getCardsByColumnSelector = (columnId) =>
	createSelector(cardsState, (cards) => {
		return cards?.cardsArray?.filter((card) => card.columnId === columnId)?.sort((a, b) => a.position - b.position);
	});
