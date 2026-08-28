import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: []
};

const notificationSlice = createSlice({
  name: "notifications",

  initialState,

  reducers: {

    // Add Notification
    addNotification: (state, action) => {
      const {
        message,
        type = "success"
      } = action.payload;

      state.list.push({
        id: Date.now(),
        message,
        type
      });
    },

    // Remove Notification
    removeNotification: (state, action) => {
      state.list = state.list.filter(
        (notification) =>
          notification.id !== action.payload
      );
    }
  }
});

export const {
  addNotification,
  removeNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;