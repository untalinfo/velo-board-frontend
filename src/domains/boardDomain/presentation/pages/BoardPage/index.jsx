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
	const columnsData = useSelector(getColumnsByBoardSelector) || [];
	const columnsDataIds = columnsData.map((column) => column._id);

	// --- Drag and Drop Setup ---
	const handleColumnDragEnd = (payload) => {
		const { initialIndex, targetIndex } = payload;

		// Si no hay cambios en el índice, no hacemos nada
		if (initialIndex === targetIndex) {
			console.log('No changes in column order.');
			return;
		}
		// Aquí puedes manejar el cambio de orden de las columnas
		const findColumn = columnsData.find((col) => col.position === initialIndex);
		dispatch(
			putMoveColumn({
				columnId: findColumn?._id,
				newPosition: targetIndex,
				boardId: boardData?._id,
			}),
		);
	};

	const [parentRef, orderedColumns, setOrderedColumns] = useDragAndDrop([], {
		group: 'columnsGroup',
		handleEnd: handleColumnDragEnd,
	});
	// --- Fin Drag and Drop Setup ---

	useEffect(() => {
		if (columnsDataIds?.length > 0 && JSON.stringify(orderedColumns) !== JSON.stringify(columnsDataIds)) {
			setOrderedColumns(columnsDataIds);
		}
	}, [columnsDataIds, orderedColumns, setOrderedColumns]);

	useEffect(() => {
		dispatch(getBoard());
		if (boardData?._id) {
			dispatch(getColumnsByBoard(boardData?._id));
		}
		if (boardData?._id) {
			dispatch(getCardsByBoard(boardData?._id));
		}
	}, [dispatch, boardData._id]);

	const handleNewList = () => {
		const newColumn = {
			boardId: boardData?._id,
		};
		dispatch(postCreateColumn(newColumn));
	};

	if (!columnsData || columnsData.length === 0) {
		return <p>Loading columns...</p>;
	}

	return (
		<main className="container-board">
			<header className="header-board">
				<h1 className="title">{boardData?.title}</h1>
				<p className="description">{boardData?.description}</p>
			</header>

			<section className="columns-container">
				<div className="column-wrapper" ref={parentRef}>
					{orderedColumns.map((columnId) => {
						const column = columnsData.find((col) => col._id === columnId);
						if (!column) return null;
						return (
							<div key={columnId} className="column-draggable" data-label={columnId}>
								<Column column={column} />
							</div>
						);
					})}
				</div>
				<div className="add-new-list-contianer" onClick={handleNewList}>
					<i className={ADD_ICON}></i>
					<p>Add new list</p>
				</div>
			</section>
		</main>
	);
};

export default BoardPage;
