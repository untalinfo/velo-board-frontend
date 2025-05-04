import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	deleteCardRequest,
	getCardsByBoardRequest,
	postNewCardRequest,
	putUpdateCardRequest,
} from '../../infrastructure/api';

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

export const postCreateCard = createAsyncThunk('cards/createCard', async (data, { rejectWithValue }) => {
	try {
		const response = await postNewCardRequest(data);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteCard = createAsyncThunk('cards/deleteCard', async (cardId, { rejectWithValue }) => {
	try {
		const response = await deleteCardRequest(cardId);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const putUpdateCard = createAsyncThunk(
	'cards/updateCard',
	async ({ formattedData, cardId }, { rejectWithValue }) => {
		try {
			const response = await putUpdateCardRequest(formattedData, cardId);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

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
		[postCreateCard.pending]: (state) => {
			state.error = null;
		},
		[postCreateCard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[postCreateCard.fulfilled]: (state, { payload }) => {
			state.response = payload;
			state.cardsArray.push(payload);
		},
		[deleteCard.pending]: (state) => {
			state.error = null;
		},
		[deleteCard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[deleteCard.fulfilled]: (state, { payload }) => {
			state.response = payload;
			state.cardsArray = state.cardsArray.filter((card) => card._id !== payload._id);
		},
		[putUpdateCard.pending]: (state) => {
			state.error = null;
		},
		[putUpdateCard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[putUpdateCard.fulfilled]: (state, { payload }) => {
			state.response = payload;
			const index = state.cardsArray.findIndex((card) => card._id === payload._id);
			if (index !== -1) {
				state.cardsArray[index] = payload;
			}
		},
	},
});

export default Cards.reducer;
