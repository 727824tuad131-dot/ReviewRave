import api from "../api/api";

const ticketService = {

  // Get tickets
  getAll: async () => {
    const response = await api.get(
      "/tickets"
    );

    return response.data;
  },

  // Assign ticket
  assign: async (id) => {
    const response = await api.put(
      `/tickets/${id}/assign`
    );

    return response.data;
  },

  // Resolve ticket
  resolve: async (id, data) => {
    const response = await api.put(
      `/tickets/${id}/resolve`,
      data
    );

    return response.data;
  }

};

export default ticketService;