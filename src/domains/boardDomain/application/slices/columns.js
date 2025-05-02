import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getColumnsByBoardRequest } from '../../infrastructure/api';

export const initialState = {
	columnsArray: [],
	error: null,
	response: false,
};

export const getColumnsByBoard = createAsyncThunk('columns/getColumns', async (boardId, { rejectWithValue }) => {
	try {
		const response = await getColumnsByBoardRequest(boardId);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Columns = createSlice({
	name: 'columns',
	initialState,
	extraReducers: {
		[getColumnsByBoard.pending]: (state) => {
			state.error = null;
		},
		[getColumnsByBoard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getColumnsByBoard.fulfilled]: (state, { payload }) => {
			state.columnsArray = payload;
		},
	},
});

export default Columns.reducer;
