// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import insightService from "../../services/insightService";

// /* =========================================================
//    FETCH INSIGHTS FOR A PRODUCT
//    ========================================================= */

// export const fetchInsights = createAsyncThunk(
//   "insights/fetchInsights",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await insightService.getInsights(productId);

//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to fetch insights"
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

// const insightSlice = createSlice({
//   name: "insights",
//   initialState,

//   reducers: {
//     clearInsightError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInsights.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchInsights.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.content || [];
//       })

//       .addCase(fetchInsights.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload || "Failed to fetch insights";
//       });
//   },
// });

// export const { clearInsightError } = insightSlice.actions;

// export default insightSlice.reducer;


