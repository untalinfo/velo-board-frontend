import React from 'react';
import './BoardPage.scss';
import { ADD_ICON } from '../../../../../shared/application/constants/icons';
import Column from '../../components/Column/indes';

const BoardPage = () => {
	return (
		<main className="container-board">
			<header>
				<h1>title board</h1>
				<p>description board</p>
			</header>

			<section className="columns-container">
				<Column />
				<div className="add-new-list-contianer">
					<i className={ADD_ICON}></i>
					<p>Add new list</p>
				</div>
			</section>
		</main>
	);
};

export default BoardPage;
