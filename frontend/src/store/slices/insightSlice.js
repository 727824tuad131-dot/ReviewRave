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



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import insightService from '../../services/insightService';

export const getInsights = createAsyncThunk(
  'insights/getInsights',
  async (productId, { rejectWithValue }) => {
    try {
      return await insightService.getReviewInsights(productId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch insights');
    }
  }
);

export const getReviewInsights = getInsights;

const initialState = {
  insights: null,
  items: [],
  isLoading: false,
  isError: false,
};

const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInsights.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.insights = action.payload;
      })
      .addCase(getInsights.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default insightSlice.reducer;