import api from "./api";

const insightService = {
  getInsights: async (productId) => {
    return await api.get(`/insights/product/${productId}`);
  },
};

export default insightService;