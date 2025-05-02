import { createSelector } from '@reduxjs/toolkit';

export const columnsState = (state) => state.columns;

export const getColumnsByBoardSelector = createSelector(columnsState, (columns) => {
	return columns?.columnsArray;
});
