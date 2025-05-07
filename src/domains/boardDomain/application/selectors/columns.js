import { createSelector } from '@reduxjs/toolkit';

export const columnsState = (state) => state.columns;

export const getColumnsByBoardSelector = createSelector(columnsState, (columns) => {
	return columns?.columnsArray.slice().sort((a, b) => a.position - b.position);
});

export const getColumnByIdSelector = (columnId) =>
	createSelector(columnsState, (columns) => {
		return columns?.columnsArray.find((column) => column._id === columnId);
	});
