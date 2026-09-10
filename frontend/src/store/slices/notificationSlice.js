// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,

//   reducers: {
//     addNotification: (state, action) => {
//       state.items.push({
//         id: Date.now(),
//         type: action.payload?.type || "info",
//         message: action.payload?.message || "",
//       });
//     },

//     removeNotification: (state, action) => {
//       state.items = state.items.filter(
//         (notification) => notification.id !== action.payload
//       );
//     },

//     clearNotifications: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const {
//   addNotification,
//   removeNotification,
//   clearNotifications,
// } = notificationSlice.actions;

// export default notificationSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { id = Date.now(), message, type = 'info' } = action.payload;
      state.notifications.push({ id, message, type });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;