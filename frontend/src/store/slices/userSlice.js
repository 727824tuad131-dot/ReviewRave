import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

/* =========================================================
   FETCH USERS
   ========================================================= */

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers();

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to fetch users"
      );
    }
  }
);

/* =========================================================
   TOGGLE USER STATUS
   ========================================================= */

export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.toggleUserStatus(id);

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to update user status"
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState = {
  items: [],
  loading: false,
  error: null,
};

/* =========================================================
   SLICE
   ========================================================= */

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ---------------- FETCH USERS ---------------- */

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });

    /* ---------------- TOGGLE USER STATUS ---------------- */

    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedUser = action.payload;

        if (!updatedUser?.id) {
          return;
        }

        const index = state.items.findIndex(
          (user) => user.id === updatedUser.id
        );

        if (index !== -1) {
          state.items[index] = updatedUser;
        }
      })

      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to update user status";
      });
  },
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;