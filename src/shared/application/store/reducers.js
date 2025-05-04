import { combineReducers } from 'redux';
import example, { initialState as exampleInitial } from '../../../domains/exampleDomain/application/slices/example';
import board from '../../../domains/boardDomain/application/slices/board';
import columns from '../../../domains/boardDomain/application/slices/columns';
import cards from '../../../domains/boardDomain/application/slices/cards';

export const initialStates = {
	example: exampleInitial,
};

export default combineReducers({
	example,
	board,
	columns,
	cards,
});
