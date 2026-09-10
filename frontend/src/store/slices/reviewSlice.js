// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import reviewService from "../../services/reviewService";

// /* =========================================================
//    FETCH REVIEWS FOR A PRODUCT
//    ========================================================= */

// export const fetchReviews = createAsyncThunk(
//   "reviews/fetchReviews",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await reviewService.getReviews(productId);
//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to fetch reviews"
//       );
//     }
//   }
// );

// /* =========================================================
//    INGEST REVIEW
//    ========================================================= */

// export const ingestReview = createAsyncThunk(
//   "reviews/ingestReview",
//   async (reviewData, { rejectWithValue }) => {
//     try {
//       const response = await reviewService.ingestReview(reviewData);
//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to submit review"
//       );
//     }
//   }
// );

// /* =========================================================
//    DELETE REVIEW
//    ========================================================= */

// export const deleteReview = createAsyncThunk(
//   "reviews/deleteReview",
//   async (id, { rejectWithValue }) => {
//     try {
//       await reviewService.deleteReview(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to delete review"
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

// const reviewSlice = createSlice({
//   name: "reviews",
//   initialState,

//   reducers: {
//     clearReviewError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     /* ---------------- FETCH REVIEWS ---------------- */

//     builder
//       .addCase(fetchReviews.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.content || [];
//       })

//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch reviews";
//       });

//     /* ---------------- INGEST REVIEW ---------------- */

//     builder
//       .addCase(ingestReview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(ingestReview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         if (action.payload) {
//           state.items.unshift(action.payload);
//         }
//       })

//       .addCase(ingestReview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to submit review";
//       });

//     /* ---------------- DELETE REVIEW ---------------- */

//     builder
//       .addCase(deleteReview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(deleteReview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = state.items.filter(
//           (review) => review.id !== action.payload
//         );
//       })

//       .addCase(deleteReview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to delete review";
//       });
//   },
// });

// export const { clearReviewError } = reviewSlice.actions;

// export default reviewSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from '../../services/reviewService';

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async (data, { rejectWithValue }) => {
    try {
      return await reviewService.submitReview(data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit review');
    }
  }
);

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (_, { rejectWithValue }) => {
    try {
      return await reviewService.getReviews();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch reviews');
    }
  }
);

const initialState = {
  items: [],
  insights: null,
  isLoading: false,
  isError: false,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(submitReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(submitReview.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default reviewSlice.reducer;