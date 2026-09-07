import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";

/* =========================================================
   ERROR MESSAGE HELPER
========================================================= */

const getErrorMessage = (error, fallback) => {
  const data = error?.response?.data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
};

/* =========================================================
   LOGIN
========================================================= */

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      return response?.data ?? response;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Login failed")
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

      return response?.data ?? response;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Registration failed")
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  user: null,

  /* These are required by the Redux tests */
  token: null,
  role: null,
  userId: null,

  loading: false,
  error: null,
};

/* =========================================================
   AUTH SLICE
========================================================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /* =====================================================
       LOGOUT
    ===================================================== */

    logout: (state) => {
      /*
       * Clear Redux authentication state.
       */
      state.user = null;
      state.token = null;
      state.role = null;
      state.userId = null;
      state.loading = false;
      state.error = null;

      /*
       * Clear browser session.
       */
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
    },

    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* =====================================================
       LOGIN PENDING
    ===================================================== */

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /* =====================================================
       LOGIN SUCCESS
    ===================================================== */

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const data = action.payload || {};

      /*
       * Store authentication data directly in Redux.
       *
       * T29 checks:
       * state.auth.token
       */
      state.token = data.token ?? null;
      state.role = data.role ?? null;
      state.userId =
        data.userId !== undefined && data.userId !== null
          ? data.userId
          : null;

      state.user = data;

      /*
       * Persist authentication information.
       */
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      if (
        data.userId !== undefined &&
        data.userId !== null
      ) {
        localStorage.setItem(
          "userId",
          String(data.userId)
        );
      }

      if (data.email) {
        localStorage.setItem("email", data.email);
      }
    });

    /* =====================================================
       LOGIN FAILURE
    ===================================================== */

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    /* =====================================================
       REGISTER PENDING
    ===================================================== */

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /* =====================================================
       REGISTER SUCCESS
    ===================================================== */

    builder.addCase(
      registerUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = null;

        const data = action.payload || {};

        state.token = data.token ?? null;
        state.role = data.role ?? null;
        state.userId =
          data.userId !== undefined &&
          data.userId !== null
            ? data.userId
            : null;

        state.user = data;

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.role) {
          localStorage.setItem("role", data.role);
        }

        if (
          data.userId !== undefined &&
          data.userId !== null
        ) {
          localStorage.setItem(
            "userId",
            String(data.userId)
          );
        }

        if (data.email) {
          localStorage.setItem("email", data.email);
        }
      }
    );

    /* =====================================================
       REGISTER FAILURE
    ===================================================== */

    builder.addCase(
      registerUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Registration failed";
      }
    );
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  logout,
  clearError,
} = authSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default authSlice.reducer;