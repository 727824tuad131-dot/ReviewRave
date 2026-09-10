// import api from "./api";

// const ticketService = {
//   getTickets: async () => {
//     return await api.get("/tickets");
//   },

//   getOpenTickets: async () => {
//     return await api.get("/tickets/open");
//   },

//   getTicketStats: async () => {
//     return await api.get("/tickets/stats");
//   },

//   createTicket: async (insightId) => {
//     return await api.post(`/tickets/insight/${insightId}`);
//   },

//   assignTicket: async (id) => {
//     return await api.put(`/tickets/${id}/assign`);
//   },

//   resolveTicket: async (id, resolutionNote) => {
//     return await api.put(`/tickets/${id}/resolve`, {
//       resolutionNote,
//     });
//   },
// };

// export default ticketService;



import api from './api';

export const ticketService = {
  getMyTickets: async () => {
    const response = await api.get('/tickets/my');
    return response.data;
  },
  assignTicket: async (id) => {
    const response = await api.put(`/tickets/${id}/assign`);
    return response.data;
  },
  resolveTicket: async (id, data) => {
    const notes = typeof data === 'string' ? data : (data?.notes || '');
    const response = await api.post(`/tickets/${id}/resolve?notes=${encodeURIComponent(notes)}`, data);
    return response.data;
  },
};

export default ticketService;