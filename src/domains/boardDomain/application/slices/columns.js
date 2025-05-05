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

			// Actualizar la posición de la columna en el array
			const updatedColumnIndex = state.columnsArray.findIndex((column) => column._id === payload._id);
			if (updatedColumnIndex !== -1) {
				// Eliminar la columna del array
				const [updatedColumn] = state.columnsArray.splice(updatedColumnIndex, 1);

				// Insertar la columna en su nueva posición
				state.columnsArray.splice(payload.position, 0, updatedColumn);

				// Actualizar la posición de la columna
				updatedColumn.position = payload.position;
			}
		},
	},
});

export default Columns.reducer;
