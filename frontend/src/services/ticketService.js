import api from "./api";

const ticketService = {
  getTickets: async () => {
    return await api.get("/tickets");
  },

  getOpenTickets: async () => {
    return await api.get("/tickets/open");
  },

  getTicketStats: async () => {
    return await api.get("/tickets/stats");
  },

  createTicket: async (insightId) => {
    return await api.post(`/tickets/insight/${insightId}`);
  },

  assignTicket: async (id) => {
    return await api.put(`/tickets/${id}/assign`);
  },

  resolveTicket: async (id, resolutionNote) => {
    return await api.put(`/tickets/${id}/resolve`, {
      resolutionNote,
    });
  },
};

export default ticketService;
