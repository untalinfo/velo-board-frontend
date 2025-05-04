import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteColumnRequest, getColumnsByBoardRequest, postNewColumnRequest } from '../../infrastructure/api';

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

export const postCreateColumn = createAsyncThunk('columns/createColumn', async (data, { rejectWithValue }) => {
	try {
		const response = await postNewColumnRequest(data);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteColumn = createAsyncThunk('columns/deleteColumn', async (columnId, { rejectWithValue }) => {
	try {
		const response = await deleteColumnRequest(columnId);
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
		[postCreateColumn.pending]: (state) => {
			state.error = null;
		},
		[postCreateColumn.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[postCreateColumn.fulfilled]: (state, { payload }) => {
			state.response = payload;
			state.columnsArray.push(payload);
		},
		[deleteColumn.pending]: (state) => {
			state.error = null;
		},
		[deleteColumn.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[deleteColumn.fulfilled]: (state, { payload }) => {
			state.response = payload;
			state.columnsArray = state.columnsArray.filter((column) => column._id !== payload.id);
		},
	},
});

export default Columns.reducer;
