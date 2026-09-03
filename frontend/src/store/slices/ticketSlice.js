import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "../../services/ticketService";

/* =========================================================
   FETCH AGENT TICKETS
   ========================================================= */

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ticketService.getTickets();
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to fetch tickets"
      );
    }
  }
);

/* =========================================================
   FETCH OPEN TICKETS
   ========================================================= */

export const fetchOpenTickets = createAsyncThunk(
  "tickets/fetchOpenTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ticketService.getOpenTickets();
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to fetch open tickets"
      );
    }
  }
);

/* =========================================================
   ASSIGN TICKET
   ========================================================= */

export const assignTicket = createAsyncThunk(
  "tickets/assignTicket",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ticketService.assignTicket(id);
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to assign ticket"
      );
    }
  }
);

/* =========================================================
   RESOLVE TICKET
   ========================================================= */

export const resolveTicket = createAsyncThunk(
  "tickets/resolveTicket",
  async ({ id, resolutionNote }, { rejectWithValue }) => {
    try {
      const response = await ticketService.resolveTicket(
        id,
        resolutionNote
      );

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Failed to resolve ticket"
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState = {
  items: [],
  openTickets: [],
  loading: false,
  error: null,
};

/* =========================================================
   SLICE
   ========================================================= */

const ticketSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {
    clearTicketError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ---------------- FETCH TICKETS ---------------- */

    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];
      })

      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets";
      });

    /* ---------------- OPEN TICKETS ---------------- */

    builder
      .addCase(fetchOpenTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOpenTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.openTickets = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];
      })

      .addCase(fetchOpenTickets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch open tickets";
      });

    /* ---------------- ASSIGN TICKET ---------------- */

    builder
      .addCase(assignTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(assignTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedTicket = action.payload;

        if (!updatedTicket?.id) {
          return;
        }

        const index = state.items.findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );

        if (index !== -1) {
          state.items[index] = updatedTicket;
        }

        const openIndex = state.openTickets.findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );

        if (openIndex !== -1) {
          state.openTickets[openIndex] = updatedTicket;
        }
      })

      .addCase(assignTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to assign ticket";
      });

    /* ---------------- RESOLVE TICKET ---------------- */

    builder
      .addCase(resolveTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resolveTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const resolvedTicket = action.payload;

        if (!resolvedTicket?.id) {
          return;
        }

        const index = state.items.findIndex(
          (ticket) => ticket.id === resolvedTicket.id
        );

        if (index !== -1) {
          state.items[index] = resolvedTicket;
        }

        state.openTickets = state.openTickets.filter(
          (ticket) => ticket.id !== resolvedTicket.id
        );
      })

      .addCase(resolveTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to resolve ticket";
      });
  },
});

export const { clearTicketError } = ticketSlice.actions;

export default ticketSlice.reducer;