import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService";

// Initial State
const initialState = {
  items: [],
  loading: false,
  error: null
};

// Fetch Reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response =
        await reviewService.getByProduct(productId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch reviews"
      );
    }
  }
);

// Ingest Review
export const ingestReview = createAsyncThunk(
  "reviews/ingestReview",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await reviewService.ingest(data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to submit review"
      );
    }
  }
);

// Review Slice
const reviewSlice = createSlice({
  name: "reviews",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Ingest Review
      .addCase(ingestReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(ingestReview.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(ingestReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default reviewSlice.reducer;