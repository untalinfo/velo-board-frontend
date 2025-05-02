import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BoardPage.scss';
import { ADD_ICON } from '../../../../../shared/application/constants/icons';
import Column from '../../components/Column/indes';
import { getBoard } from '../../../application/slices/board';
import { getBoardSelector } from '../../../application/selectors/board';
import { getColumnsByBoard } from '../../../application/slices/columns';
import { getColumnsByBoardSelector } from '../../../application/selectors/columns';
import { getCardsByBoard } from '../../../application/slices/cards';

const BoardPage = () => {
	const dispatch = useDispatch();
	const boardData = useSelector(getBoardSelector);
	const columnsData = useSelector(getColumnsByBoardSelector);
	const sortColumns = [...(columnsData || [])].sort((a, b) => a.position - b.position);

	useEffect(() => {
		dispatch(getBoard());
		if (boardData?._id) {
			dispatch(getColumnsByBoard(boardData?._id));
		}
		if (boardData?._id) {
			dispatch(getCardsByBoard(boardData?._id));
		}
	}, [dispatch, boardData._id]);

	return (
		<main className="container-board">
			<header>
				<h1>{boardData?.title}</h1>
				<p>{boardData?.description}</p>
			</header>

			<section className="columns-container">
				{sortColumns?.map((column) => (
					<Column key={column._id} column={column} />
				))}
				<div className="add-new-list-contianer">
					<i className={ADD_ICON}></i>
					<p>Add new list</p>
				</div>
			</section>
		</main>
	);
};

export default BoardPage;
