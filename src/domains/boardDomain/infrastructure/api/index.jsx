import { urlGetBoard, urlGetCardsByBoardId, urlGetColumnsByBoardId } from './backendUrls';

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

export default { getBoardRequest };
