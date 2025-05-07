import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlGetBoard = `${urlBase}boards/default`;
export const urlGetColumnsByBoardId = (boardId) => `${urlBase}columns/board/${boardId}`;
export const urlGetCardsByBoardId = (boardId) => `${urlBase}cards/board/${boardId}`;

export const urlPostNewColumn = () => `${urlBase}columns`;
export const urlDeleteColumn = (columnId) => `${urlBase}columns/${columnId}`;
export const urlPutUpdateColumn = (columnId) => `${urlBase}columns/${columnId}`;
export const urlPutMoveColumn = (columnId) => `${urlBase}columns/${columnId}/move`;

export const urlPostNewCard = () => `${urlBase}cards`;
export const urlDeleteCard = (cardId) => `${urlBase}cards/${cardId}`;
export const urlPutUpdateCard = (cardId) => `${urlBase}cards/${cardId}`;
export const urlPutMoveCard = (cardId) => `${urlBase}cards/${cardId}/move`;

export default { urlGetBoard };
