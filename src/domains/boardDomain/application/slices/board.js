import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBoardRequest } from '../../infrastructure/api';

export const initialState = {
	boardData: {},
	error: null,
	response: false,
};

export const getBoard = createAsyncThunk('board/getBoard', async (_, { rejectWithValue }) => {
	try {
		const response = await getBoardRequest();
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Board = createSlice({
	name: 'board',
	initialState,
	extraReducers: {
		[getBoard.pending]: (state) => {
			state.error = null;
		},
		[getBoard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getBoard.fulfilled]: (state, { payload }) => {
			state.boardData = payload;
		},
	},
});

export default Board.reducer;
