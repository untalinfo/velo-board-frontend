import { combineReducers } from 'redux';
import board from '../../../domains/boardDomain/application/slices/board';
import columns from '../../../domains/boardDomain/application/slices/columns';
import cards from '../../../domains/boardDomain/application/slices/cards';
import notifications from '../slices/notifications';

export default combineReducers({
	board,
	columns,
	cards,
	notifications,
});
