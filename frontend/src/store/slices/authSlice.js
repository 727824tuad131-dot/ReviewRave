import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* =========================================================
   REGISTER - FRONTEND ONLY
========================================================= */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      // Check whether email already exists
      const userExists = existingUsers.find(
        (user) =>
          user.email.toLowerCase() ===
          userData.email.toLowerCase()
      );

      if (userExists) {
        return rejectWithValue(
          "This email is already registered. Please login."
        );
      }

      // Create new user
      const newUser = {
        userId: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
        email: userData.email,
        password: userData.password,
        role: userData.role,

        // Fake token for frontend-only mode
        token: "frontend-demo-token-" + Date.now(),
      };

      // Add user to users list
      const updatedUsers = [
        ...existingUsers,
        newUser,
      ];

      // Save all users
      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      // Save current logged-in user
      localStorage.setItem(
        "token",
        newUser.token
      );

      localStorage.setItem(
        "role",
        newUser.role
      );

      localStorage.setItem(
        "userId",
        String(newUser.userId)
      );

      localStorage.setItem(
        "email",
        newUser.email
      );

      return newUser;

    } catch (error) {
      return rejectWithValue(
        "Registration failed"
      );
    }
  }
);


/* =========================================================
   LOGIN - FRONTEND ONLY
========================================================= */

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Get registered users
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      // Find matching user
      const user = users.find(
        (item) =>
          item.email.toLowerCase() ===
            credentials.email.toLowerCase() &&
          item.password === credentials.password
      );

      // If user not found
      if (!user) {
        return rejectWithValue(
          "Invalid email or password"
        );
      }

      // Create token if needed
      const token =
        user.token ||
        "frontend-demo-token-" + Date.now();

      // Save login details
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "userId",
        String(user.userId)
      );

      localStorage.setItem(
        "email",
        user.email
      );

      return {
        ...user,
        token,
      };

    } catch (error) {
      return rejectWithValue(
        "Login failed"
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
   AUTH SLICE
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

    /* LOGIN */

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
        state.error =
          action.payload || "Login failed";
      });


    /* REGISTER */

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
        state.error =
          action.payload || "Registration failed";
      });

  },

});


export const {
  logout,
  clearError,
} = authSlice.actions;


export default authSlice.reducer;