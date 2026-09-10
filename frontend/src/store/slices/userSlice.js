// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import userService from "../../services/userService";

// /* =========================================================
//    FETCH USERS
//    ========================================================= */

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await userService.getUsers();

//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to fetch users"
//       );
//     }
//   }
// );

// /* =========================================================
//    TOGGLE USER STATUS
//    ========================================================= */

// export const toggleUserStatus = createAsyncThunk(
//   "users/toggleUserStatus",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await userService.toggleUserStatus(id);

//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to update user status"
//       );
//     }
//   }
// );

// /* =========================================================
//    INITIAL STATE
//    ========================================================= */

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// /* =========================================================
//    SLICE
//    ========================================================= */

// const userSlice = createSlice({
//   name: "users",
//   initialState,

//   reducers: {
//     clearUserError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     /* ---------------- FETCH USERS ---------------- */

//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.content || [];
//       })

//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch users";
//       });

//     /* ---------------- TOGGLE USER STATUS ---------------- */

//     builder
//       .addCase(toggleUserStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(toggleUserStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         const updatedUser = action.payload;

//         if (!updatedUser?.id) {
//           return;
//         }

//         const index = state.items.findIndex(
//           (user) => user.id === updatedUser.id
//         );

//         if (index !== -1) {
//           state.items[index] = updatedUser;
//         }
//       })

//       .addCase(toggleUserStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload || "Failed to update user status";
//       });
//   },
// });

// export const { clearUserError } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const fetchUsers = getUsers;

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await authService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete user');
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;