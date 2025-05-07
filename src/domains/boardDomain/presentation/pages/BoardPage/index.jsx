import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import './BoardPage.scss';
import Column from '../../components/Column/indes';
import { getBoard } from '../../../application/slices/board';
import { getBoardSelector } from '../../../application/selectors/board';
import { getColumnsByBoard, postCreateColumn, putMoveColumn } from '../../../application/slices/columns';
import { getColumnsByBoardSelector } from '../../../application/selectors/columns';
import { getCardsByBoard } from '../../../application/slices/cards';
import { ADD_ICON } from '../../../../../shared/application/constants/icons';

const BoardPage = () => {
	const dispatch = useDispatch();
	const boardData = useSelector(getBoardSelector);
	const columnsFromSelector = useSelector(getColumnsByBoardSelector);
	const columnAux = React.useMemo(() => columnsFromSelector || [], [columnsFromSelector]);
	const columnsData = React.useMemo(() => columnAux, [columnAux]);

	// --- Drag and Drop Setup ---
	const handleColumnDragEnd = (payload) => {
		const { initialIndex, targetIndex } = payload;

		// Si no hay cambios en el índice, no hacemos nada
		if (initialIndex === targetIndex) {
			console.log('No changes in column order.');
			return;
		}
		// Manejar el cambio de orden de las columnas
		const findColumn = columnsData.find((col) => col.position === initialIndex);
		if (findColumn) {
			dispatch(
				putMoveColumn({
					columnId: findColumn?._id,
					newPosition: targetIndex,
					boardId: boardData?._id,
				}),
			);
		}
	};

	const [columnContainerRef, columnsDrag, setColumns] = useDragAndDrop(columnsData, {
		group: 'boardColumnsGroup',
		handleEnd: handleColumnDragEnd,
		dragHandle: '.kanban-handle',
	});
	// --- Fin Drag and Drop Setup ---

	useEffect(() => {
		if (columnsData && JSON.stringify(columnsDrag) !== JSON.stringify(columnsData)) {
			setColumns(columnsData);
		}
	}, [columnsData, columnsDrag, setColumns]);

	useEffect(() => {
		dispatch(getBoard());
	}, [dispatch]);

	useEffect(() => {
		if (boardData?._id) {
			dispatch(getColumnsByBoard(boardData._id));
			dispatch(getCardsByBoard(boardData._id));
		}
	}, [dispatch, boardData?._id]);

	const handleNewList = () => {
		const newColumn = {
			boardId: boardData?._id,
		};
		dispatch(postCreateColumn(newColumn));
	};

	return (
		<main className="container-board">
			<header className="header-board">
				<h1 className="title">{boardData?.title}</h1>
				<p className="description">{boardData?.description}</p>
			</header>

			<section className="columns-container">
				{!columnsData || columnsData.length === 0 ? (
					<></>
				) : (
					<div className="column-wrapper" ref={columnContainerRef}>
						{columnsDrag.map((column) => {
							if (!column) return null;
							return (
								<div key={column?._id} className="column-draggable" data-label={column?._id}>
									<Column columnId={column?._id} />
								</div>
							);
						})}
					</div>
				)}

				<div className="add-new-list-contianer" onClick={handleNewList}>
					<i className={ADD_ICON}></i>
					<p>Add new list</p>
				</div>
			</section>
		</main>
	);
};

export default BoardPage;
