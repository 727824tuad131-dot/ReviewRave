import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "../../services/ticketService";

// Initial State
const initialState = {
  items: [],
  openTickets: [],
  loading: false,
  error: null
};

// Fetch Agent Tickets
export const fetchAgentTickets = createAsyncThunk(
  "tickets/fetchAgentTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ticketService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch agent tickets"
      );
    }
  }
);

// Fetch Open Tickets
export const fetchOpenTickets = createAsyncThunk(
  "tickets/fetchOpenTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ticketService.getOpen();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch open tickets"
      );
    }
  }
);

// Assign Ticket
export const assignTicket = createAsyncThunk(
  "tickets/assignTicket",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ticketService.assign(id);
      return {
        id,
        data: response
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to assign ticket"
      );
    }
  }
);

// Resolve Ticket
export const resolveTicket = createAsyncThunk(
  "tickets/resolveTicket",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ticketService.resolve(
        id,
        data
      );

      return {
        id,
        data: response
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to resolve ticket"
      );
    }
  }
);

// Ticket Slice
const ticketSlice = createSlice({
  name: "tickets",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Agent Tickets
      .addCase(fetchAgentTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchAgentTickets.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchAgentTickets.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Fetch Open Tickets
      .addCase(fetchOpenTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchOpenTickets.fulfilled,
        (state, action) => {
          state.loading = false;
          state.openTickets = action.payload;
        }
      )

      .addCase(
        fetchOpenTickets.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Assign Ticket
      .addCase(assignTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        assignTicket.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        assignTicket.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Resolve Ticket
      .addCase(resolveTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        resolveTicket.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        resolveTicket.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export default ticketSlice.reducer;