import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	deleteColumnRequest,
	getColumnsByBoardRequest,
	postNewColumnRequest,
	putMoveColumnRequest,
} from '../../infrastructure/api';

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

export const putMoveColumn = createAsyncThunk('columns/moveColumn', async (data, { rejectWithValue }) => {
	try {
		const response = await putMoveColumnRequest(data.columnId, data);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Columns = createSlice({
	name: 'columns',
	initialState,
	reducers: {
		updateColumn: (state, { payload }) => {
			const index = state.columnsArray.findIndex((col) => col._id === payload._id);
			if (index !== -1) {
				state.columnsArray[index] = payload;
			}
		},
	},
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
		[putMoveColumn.pending]: (state) => {
			state.error = null;
		},
		[putMoveColumn.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[putMoveColumn.fulfilled]: (state, { payload }) => {
			state.response = payload;

			const updatedCard = payload;
			const { _id, columnId, position: newPosition } = updatedCard;

			// 1. Filtrar tarjetas que están en la misma columna
			let sameColumnCards = state.columnsArray.filter((card) => card.columnId === columnId);

			// 2. Remover la tarjeta antigua de la columna
			sameColumnCards = sameColumnCards.filter((card) => card._id !== _id);

			// 3. Insertar la tarjeta actualizada en su nueva posición
			sameColumnCards.splice(newPosition, 0, updatedCard);

			// 4. Reasignar posiciones para mantener el orden
			sameColumnCards = sameColumnCards.map((card, idx) => ({
				...card,
				position: idx,
			}));

			// 5. Reconstruir el estado completo: otras columnas + columna actualizada
			const otherColumns = state.columnsArray.filter((card) => card.columnId !== columnId);
			state.columnsArray = [...otherColumns, ...sameColumnCards];
		},
	},
});

export const { updateColumn } = Columns.actions;

export default Columns.reducer;
