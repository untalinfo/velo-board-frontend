import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ARROW_DOWN, ICON_BELL, ICON_SEARCH } from '../../../application/constants/icons';
import './Header.scss';
import MenuOptions from './MenuOptions';
import { getBoardIdSelector } from '../../../../domains/boardDomain/application/selectors/board';
import { registerSocketEvents } from '../../../application/helpers/events/socketEvents';
import { handleAnyEvent } from '../../../application/helpers/events/socketEventHandlers';
import { getNotificationsSelector } from '../../../application/selectors/notifications';

const Header = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const notifications = useSelector(getNotificationsSelector);
	const boardId = useSelector(getBoardIdSelector);
	const [showListNotifications, setShowListNotifications] = useState(false);
	const dispatch = useDispatch();

	const wrappedHandleAnyEvent = useCallback(
		(eventName, eventData) => {
			handleAnyEvent(eventName, eventData, dispatch);
		},
		[dispatch],
	);

	useEffect(() => {
		// Registrar eventos del socket
		const cleanup = registerSocketEvents(boardId, wrappedHandleAnyEvent);

		// Limpieza al desmontar
		return () => {
			cleanup();
		};
	}, [boardId, wrappedHandleAnyEvent]);

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const handleShowOptions = () => {
		setShowOptions(!showOptions);
	};

	const handleShowListNotifications = () => {
		setShowListNotifications(!showListNotifications);
	};

	return (
		<header className={`contianer-header ${isScrolled ? 'scrolled' : ''}`}>
			<img src="/assets/velo-logo.png" className="img-logo" alt="" />
			<section className="right-section-container">
				<div className="notifications-container">
					{showListNotifications && (
						<div className="notifications-list-container">
							{notifications.length > 0 ? (
								<ul className="notifications-list">
									{notifications.map((notif, index) => (
										<li key={index} className="notification-item">
											{notif.message}
										</li>
									))}
								</ul>
							) : (
								<p>No notifications</p>
							)}
						</div>
					)}
					<p>{notifications[0]?.message || `No notifications`}</p>
					<i className={`${ICON_BELL} icon-notification`} onClick={handleShowListNotifications}></i>
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
