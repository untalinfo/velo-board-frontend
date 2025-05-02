import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCardsByBoardRequest } from '../../infrastructure/api';

export const initialState = {
	cardsArray: [],
	error: null,
	response: false,
};

export const getCardsByBoard = createAsyncThunk('cards/getCards', async (boardId, { rejectWithValue }) => {
	try {
		const response = await getCardsByBoardRequest(boardId);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Cards = createSlice({
	name: 'cards',
	initialState,
	extraReducers: {
		[getCardsByBoard.pending]: (state) => {
			state.error = null;
		},
		[getCardsByBoard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getCardsByBoard.fulfilled]: (state, { payload }) => {
			state.cardsArray = payload;
		},
	},
});

export default Cards.reducer;
