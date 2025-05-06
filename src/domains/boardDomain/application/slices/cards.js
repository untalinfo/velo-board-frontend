import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	deleteCardRequest,
	getCardsByBoardRequest,
	postNewCardRequest,
	putMoveCardRequest,
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

export const putMoveCard = createAsyncThunk(
	'cards/moveCard',
	async ({ formattedData, cardId }, { rejectWithValue }) => {
		try {
			const response = await putMoveCardRequest(formattedData, cardId);
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
		[putMoveCard.pending]: (state) => {
			state.error = null;
		},
		[putMoveCard.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[putMoveCard.fulfilled]: (state, { payload }) => {
			state.response = payload;
			// Encontrar la tarjeta actualizada en el array
			const cardIndex = state.cardsArray.findIndex((card) => card._id === payload._id);
			if (cardIndex !== -1) {
				// Eliminar la tarjeta del array
				const [movedCard] = state.cardsArray.splice(cardIndex, 1);

				// Actualizar la posición y columna de la tarjeta
				movedCard.position = payload.position;
				movedCard.columnId = payload.columnId;

				// Insertar la tarjeta en su nueva posición dentro de la columna correspondiente
				const targetIndex = state.cardsArray.findIndex(
					(card) => card.columnId === payload.columnId && card.position >= payload.position,
				);
				if (targetIndex === -1) {
					// Si no hay tarjetas con una posición mayor o igual, agregar al final
					state.cardsArray.push(movedCard);
				} else {
					// Insertar en la posición correcta
					state.cardsArray.splice(targetIndex, 0, movedCard);
				}
				// Reordenar las posiciones de las tarjetas dentro de la columna
				const columnCards = state.cardsArray.filter((card) => card.columnId === payload.columnId);
				columnCards.forEach((card, index) => {
					card.position = index;
				});
			}
		},
	},
});

export default Cards.reducer;
