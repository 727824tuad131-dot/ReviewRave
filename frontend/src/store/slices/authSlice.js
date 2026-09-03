import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";

/* =========================================================
   LOGIN
   ========================================================= */

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      const data = response?.data || response;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.role) {
        localStorage.setItem("role", data.role);
      }

      if (data?.userId !== undefined && data?.userId !== null) {
        localStorage.setItem("userId", String(data.userId));
      }

      if (data?.email) {
        localStorage.setItem("email", data.email);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Login failed"
      );
    }
  }
);

/* =========================================================
   REGISTER
   ========================================================= */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      const data = response?.data || response;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.role) {
        localStorage.setItem("role", data.role);
      }

      if (data?.userId !== undefined && data?.userId !== null) {
        localStorage.setItem("userId", String(data.userId));
      }

      if (data?.email) {
        localStorage.setItem("email", data.email);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Registration failed"
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState = {
  user: null,
  loading: false,
  error: null,
};

/* =========================================================
   SLICE
   ========================================================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ---------------- LOGIN ---------------- */

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    /* ---------------- REGISTER ---------------- */

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;