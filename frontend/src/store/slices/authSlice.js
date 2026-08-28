import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null
};

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);

      // Store authentication information
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.userId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);

      // Store authentication information
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.userId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Registration failed."
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // Logout
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      state.user = null;
      state.loading = false;
      state.error = null;
    },

    // Clear Error
    clearError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    // -------------------------
    // LOGIN
    // -------------------------

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = {
          token: action.payload.token,
          role: action.payload.role,
          userId: action.payload.userId
        };
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------------
    // REGISTER
    // -------------------------

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = {
          token: action.payload.token,
          role: action.payload.role,
          userId: action.payload.userId
        };
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;