import {
	urlDeleteCard,
	urlDeleteColumn,
	urlGetBoard,
	urlGetCardsByBoardId,
	urlGetColumnsByBoardId,
	urlPostNewCard,
	urlPostNewColumn,
	urlPutUpdateCard,
	urlPutUpdateColumn,
} from './backendUrls';

export const getBoardRequest = () => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetBoard, requestOptions).then((response) => response.json());
};

export const getColumnsByBoardRequest = (boardId) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetColumnsByBoardId(boardId), requestOptions).then((response) => response.json());
};

export const getCardsByBoardRequest = (boardId) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetCardsByBoardId(boardId), requestOptions).then((response) => response.json());
};

export const postNewColumnRequest = (data) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	};
	return fetch(urlPostNewColumn(), requestOptions).then((response) => response.json());
};

export const deleteColumnRequest = (columnId) => {
	const requestOptions = {
		method: 'DELETE',
	};
	return fetch(urlDeleteColumn(columnId), requestOptions).then((response) => response.json());
};

export const putUpdateColumnRequest = (columnId, data) => {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	};
	return fetch(urlPutUpdateColumn(columnId), requestOptions).then((response) => response.json());
};

export const postNewCardRequest = (data) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	};
	return fetch(urlPostNewCard(), requestOptions).then((response) => response.json());
};

export const deleteCardRequest = (cardId) => {
	const requestOptions = {
		method: 'DELETE',
	};
	return fetch(urlDeleteCard(cardId), requestOptions).then((response) => response.json());
};

export const putUpdateCardRequest = (data, cardId) => {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	};
	return fetch(urlPutUpdateCard(cardId), requestOptions).then((response) => response.json());
};

export default { getBoardRequest };
