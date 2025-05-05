import { createSelector } from '@reduxjs/toolkit';

export const notificationsState = (state) => state.notifications;

export const getNotificationsSelector = createSelector(notificationsState, (notifications) => {
	return notifications?.notifications;
});
