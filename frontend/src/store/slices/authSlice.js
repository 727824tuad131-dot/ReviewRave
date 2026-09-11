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

/*
=========================================================
LOCAL AUTHENTICATION
Backend is NOT required for Login/Register.
=========================================================
*/

/* =======================================================
   REGISTER
======================================================= */

export const register = createAsyncThunk(
  "auth/register",

  async (userData, { rejectWithValue }) => {
    try {
      const existingAccount = JSON.parse(
        localStorage.getItem("reviewraveAccount")
      );

      /* Check duplicate email */
      if (
        existingAccount &&
        existingAccount.email?.toLowerCase() ===
          userData.email?.toLowerCase()
      ) {
        return rejectWithValue(
          "An account with this email already exists."
        );
      }

      /* Save account locally */
      const account = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName || "",
        email: userData.email,
        password: userData.password,
        role: userData.role,
      };

      localStorage.setItem(
        "reviewraveAccount",
        JSON.stringify(account)
      );

      /*
        Registration should NOT automatically login.
        We only save the account and return success.
      */

      return {
        success: true,
        message: "Account created successfully.",
        user: account,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Registration failed"
      );
    }
  }
);


/* =======================================================
   LOGIN
======================================================= */

export const login = createAsyncThunk(
  "auth/login",

  async (credentials, { rejectWithValue }) => {
    try {
      const savedAccount = JSON.parse(
        localStorage.getItem("reviewraveAccount")
      );

      /* No registered account */
      if (!savedAccount) {
        return rejectWithValue(
          "No account found. Please register first."
        );
      }

      /* Check email */
      if (
        savedAccount.email?.toLowerCase() !==
        credentials.email?.toLowerCase()
      ) {
        return rejectWithValue(
          "Invalid email or password."
        );
      }

      /* Check password */
      if (savedAccount.password !== credentials.password) {
        return rejectWithValue(
          "Invalid email or password."
        );
      }

      /*
        Create a local token.
        This is only for frontend route protection.
      */
      const localToken =
        "local-token-" + Date.now();

      localStorage.setItem(
        "token",
        localToken
      );

      localStorage.setItem(
        "role",
        savedAccount.role
      );

      localStorage.setItem(
        "email",
        savedAccount.email
      );

      return {
        token: localToken,
        user: savedAccount,
        role: savedAccount.role,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed"
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
  token: localStorage.getItem("token") || null,

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
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      state.token = null;
      state.user = null;

      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },


    /* ===================================================
       RESET
    =================================================== */

    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },


    /* ===================================================
       CLEAR ERROR
    =================================================== */

    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },


    /* ===================================================
       SET USER
    =================================================== */

    setUser: (state, action) => {
      state.user = action.payload;

      state.token =
        action.payload?.token ||
        state.token;
    },

  },


  /* =====================================================
     ASYNC ACTIONS
  ===================================================== */

  extraReducers: (builder) => {

    /* ===================================================
       LOGIN
    =================================================== */

    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.token =
          action.payload?.token || null;

        state.user =
          action.payload?.user ||
          null;

        state.message = "";
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message =
          action.payload ||
          "Login failed";
      });


    /* ===================================================
       REGISTER
    =================================================== */

    builder

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        /*
          IMPORTANT:
          Registration does NOT create login session.
        */

        state.token = null;
        state.user = null;

        state.message =
          action.payload?.message ||
          "Account created successfully.";
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message =
          action.payload ||
          "Registration failed";
      });
  },
});


/* =======================================================
   EXPORTS
======================================================= */

export const {
  logout,
  reset,
  clearError,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;