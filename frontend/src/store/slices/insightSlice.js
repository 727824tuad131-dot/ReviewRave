import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import insightService from "../../services/insightService";

// Initial State
const initialState = {
  items: [],
  loading: false
};

// Fetch Insights
export const fetchInsights = createAsyncThunk(
  "insights/fetchInsights",
  async (productId, { rejectWithValue }) => {
    try {
      const response =
        await insightService.getByProduct(productId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch insights"
      );
    }
  }
);

// Insight Slice
const insightSlice = createSlice({
  name: "insights",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchInsights.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchInsights.rejected,
        (state) => {
          state.loading = false;
        }
      );
  }
});

export default insightSlice.reducer;