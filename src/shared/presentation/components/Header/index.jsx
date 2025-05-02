import React, { useState } from 'react';
import { ARROW_DOWN, ICON_BELL, ICON_SEARCH } from '../../../application/constants/icons';
import './Header.scss';
import MenuOptions from './MenuOptions';

const Header = () => {
	const [showOptions, setShowOptions] = useState(false);

	const handleShowOptions = () => {
		setShowOptions(!showOptions);
	};
	return (
		<header className="contianer-header">
			<img src="/assets/velo-logo.png" className="img-logo" alt="" />
			<section className="right-section-container">
				<div className="notifications-container">
					<p>some notification...</p>
					<i className={`${ICON_BELL} icon-notification`}></i>
				</div>
				<div className="search-profile-contianer">
					<div className="search-input-container">
						<i className={ICON_SEARCH}></i>
						<input type="search" name="" id="" placeholder="Search" className="input" />
					</div>
					<div className="user-options-container">
						<div className="user-wrapper">
							<img src="/assets/user-icon.png" alt="" />
							<p>Maria Gil</p>
						</div>
						<i className={`${ARROW_DOWN} icon-options`} onClick={handleShowOptions}></i>
						{showOptions && <MenuOptions />}
					</div>
				</div>
			</section>
		</header>
	);
};

export default Header;
