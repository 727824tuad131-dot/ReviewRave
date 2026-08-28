import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../api/api";

// Initial State
const initialState = {
  items: [],
  loading: false
};

// Fetch Users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    }
  }
);

// Toggle User Status
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/${id}/toggle-status`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to change user status"
      );
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })

      // Toggle Status
      .addCase(
        toggleUserStatus.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        toggleUserStatus.fulfilled,
        (state, action) => {
          state.loading = false;

          const updatedUser = action.payload;

          const index = state.items.findIndex(
            (user) =>
              user.id === updatedUser.id
          );

          if (index !== -1) {
            state.items[index] = updatedUser;
          }
        }
      )

      .addCase(
        toggleUserStatus.rejected,
        (state) => {
          state.loading = false;
        }
      );
  }
});

export default userSlice.reducer;