import { createSelector } from '@reduxjs/toolkit';

export const boardState = (state) => state.board;

export const getBoardSelector = createSelector(boardState, (board) => {
	return board?.boardData;
});

export const getBoardIdSelector = createSelector(boardState, (board) => {
	return board?.boardData?._id;
});
