import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notifications: [],
};

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification: (state, action) => {
			state.notifications = [action.payload, ...state.notifications].slice(0, 10);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
