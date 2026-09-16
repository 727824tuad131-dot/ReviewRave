// import api from "./api";

// const insightService = {
//   getInsights: async (productId) => {
//     return await api.get(`/insights/product/${productId}`);
//   },
// };

// export default insightService;

import api from './api';

export const insightService = {
  getReviewInsights: async (productId) => {
    const response = await api.get(`/insights/product/${productId}`);
    return response.data;
  },

  getInsights: async (productId) => {
    if (!productId) {
      return null;
    }

    const response = await api.get(`/insights/product/${productId}`);
    return response.data;
  },
};

export default insightService;