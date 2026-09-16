// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "../../services/authService";

// /* =========================================================
//    ERROR MESSAGE HELPER
// ========================================================= */

// const getErrorMessage = (error, fallback) => {
//   const data = error?.response?.data;

//   if (typeof data === "string") {
//     return data;
//   }

//   if (data?.message) {
//     return data.message;
//   }

//   if (data?.error) {
//     return data.error;
//   }

//   if (error?.message) {
//     return error.message;
//   }

//   return fallback;
// };

// /* =========================================================
//    LOGIN
// ========================================================= */

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await authService.login(credentials);

//       return response?.data ?? response;
//     } catch (error) {
//       return rejectWithValue(
//         getErrorMessage(error, "Login failed")
//       );
//     }
//   }
// );

// /* =========================================================
//    REGISTER
// ========================================================= */

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await authService.register(userData);

//       return response?.data ?? response;
//     } catch (error) {
//       return rejectWithValue(
//         getErrorMessage(error, "Registration failed")
//       );
//     }
//   }
// );

// /* =========================================================
//    INITIAL STATE
// ========================================================= */

// const initialState = {
//   user: null,

//   /* These are required by the Redux tests */
//   token: null,
//   role: null,
//   userId: null,

//   loading: false,
//   error: null,
// };

// /* =========================================================
//    AUTH SLICE
// ========================================================= */

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     /* =====================================================
//        LOGOUT
//     ===================================================== */

//     logout: (state) => {
//       /*
//        * Clear Redux authentication state.
//        */
//       state.user = null;
//       state.token = null;
//       state.role = null;
//       state.userId = null;
//       state.loading = false;
//       state.error = null;

//       /*
//        * Clear browser session.
//        */
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("email");
//     },

//     /* =====================================================
//        CLEAR ERROR
//     ===================================================== */

//     clearError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     /* =====================================================
//        LOGIN PENDING
//     ===================================================== */

//     builder.addCase(login.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     /* =====================================================
//        LOGIN SUCCESS
//     ===================================================== */

//     builder.addCase(login.fulfilled, (state, action) => {
//       state.loading = false;
//       state.error = null;

//       const data = action.payload || {};

//       /*
//        * Store authentication data directly in Redux.
//        *
//        * T29 checks:
//        * state.auth.token
//        */
//       state.token = data.token ?? null;
//       state.role = data.role ?? null;
//       state.userId =
//         data.userId !== undefined && data.userId !== null
//           ? data.userId
//           : null;

//       state.user = data;

//       /*
//        * Persist authentication information.
//        */
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       if (data.role) {
//         localStorage.setItem("role", data.role);
//       }

//       if (
//         data.userId !== undefined &&
//         data.userId !== null
//       ) {
//         localStorage.setItem(
//           "userId",
//           String(data.userId)
//         );
//       }

//       if (data.email) {
//         localStorage.setItem("email", data.email);
//       }
//     });

//     /* =====================================================
//        LOGIN FAILURE
//     ===================================================== */

//     builder.addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || "Login failed";
//     });

//     /* =====================================================
//        REGISTER PENDING
//     ===================================================== */

//     builder.addCase(registerUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     /* =====================================================
//        REGISTER SUCCESS
//     ===================================================== */

//     builder.addCase(
//       registerUser.fulfilled,
//       (state, action) => {
//         state.loading = false;
//         state.error = null;

//         const data = action.payload || {};

//         state.token = data.token ?? null;
//         state.role = data.role ?? null;
//         state.userId =
//           data.userId !== undefined &&
//           data.userId !== null
//             ? data.userId
//             : null;

//         state.user = data;

//         if (data.token) {
//           localStorage.setItem("token", data.token);
//         }

//         if (data.role) {
//           localStorage.setItem("role", data.role);
//         }

//         if (
//           data.userId !== undefined &&
//           data.userId !== null
//         ) {
//           localStorage.setItem(
//             "userId",
//             String(data.userId)
//           );
//         }

//         if (data.email) {
//           localStorage.setItem("email", data.email);
//         }
//       }
//     );

//     /* =====================================================
//        REGISTER FAILURE
//     ===================================================== */

//     builder.addCase(
//       registerUser.rejected,
//       (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload || "Registration failed";
//       }
//     );
//   },
// });

// /* =========================================================
//    ACTIONS
// ========================================================= */

// export const {
//   logout,
//   clearError,
// } = authSlice.actions;

// /* =========================================================
//    REDUCER
// ========================================================= */

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

/* =======================================================
   ERROR MESSAGE HELPER
======================================================= */

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

/* =======================================================
   LOGIN
======================================================= */

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

/* =======================================================
   REGISTER
======================================================= */

export const register = createAsyncThunk(
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

/* =======================================================
   ALIASES
======================================================= */

export const loginUser = login;
export const registerUser = register;

/* =======================================================
   INITIAL STATE
======================================================= */

const initialState = {
  user: null,
  token: null,
  role: null,
  userId: null,

  loading: false,
  error: null,

  // Keep these for compatibility with existing UI/tests
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/* =======================================================
   AUTH SLICE
======================================================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /* ===================================================
       LOGOUT
    =================================================== */

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.userId = null;

      state.loading = false;
      state.error = null;

      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("reviewrave_token");
      localStorage.removeItem("user");
    },

    /* ===================================================
       RESET
    =================================================== */

    reset: (state) => {
      state.loading = false;
      state.error = null;

      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    /* ===================================================
       CLEAR ERROR
    =================================================== */

    clearError: (state) => {
      state.error = null;
      state.isError = false;
      state.message = "";
    },

    /* ===================================================
       SET USER
    =================================================== */

    setUser: (state, action) => {
      state.user = action.payload;

      if (action.payload?.token) {
        state.token = action.payload.token;
      }

      if (action.payload?.role) {
        state.role = action.payload.role;
      }

      if (action.payload?.userId !== undefined) {
        state.userId = action.payload.userId;
      }
    },
  },

  /* =====================================================
     ASYNC ACTIONS
  ===================================================== */

  extraReducers: (builder) => {
    /* ===================================================
       LOGIN PENDING
    =================================================== */

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;

      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });

    /* ===================================================
       LOGIN SUCCESS
    =================================================== */

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "";

      const data = action.payload || {};

      state.token = data.token ?? null;
      state.role = data.role ?? null;

      state.userId =
        data.userId !== undefined && data.userId !== null
          ? data.userId
          : null;

      state.user = data;

      /* Save REAL backend JWT */
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

    /* ===================================================
       LOGIN FAILED
    =================================================== */

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.error =
        action.payload || "Login failed";

      state.message =
        action.payload || "Login failed";
    });

    /* ===================================================
       REGISTER PENDING
    =================================================== */

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;

      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });

    /* ===================================================
       REGISTER SUCCESS
    =================================================== */

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;

      const data = action.payload || {};

      state.message =
        data.message ||
        "Account created successfully.";

      /*
       * Backend registration may return a JWT.
       * If it does, store it.
       */
      state.token = data.token ?? null;
      state.role = data.role ?? null;

      state.userId =
        data.userId !== undefined && data.userId !== null
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
    });

    /* ===================================================
       REGISTER FAILED
    =================================================== */

    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;

      state.error =
        action.payload || "Registration failed";

      state.message =
        action.payload || "Registration failed";
    });
  },
});

/* =======================================================
   EXPORT ACTIONS
======================================================= */

export const {
  logout,
  reset,
  clearError,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;