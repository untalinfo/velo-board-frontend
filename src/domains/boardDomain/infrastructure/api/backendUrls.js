import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlGetBoard = `${urlBase}boards/default`;
export const urlGetColumnsByBoardId = (boardId) => `${urlBase}columns/board/${boardId}`;
export const urlGetCardsByBoardId = (boardId) => `${urlBase}cards/board/${boardId}`;

export default { urlGetBoard };
