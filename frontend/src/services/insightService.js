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
    const response = await api.get(`/insights/${productId}`);
    return response.data;
  },
  getInsights: async (productId) => {
    const url = productId ? `/insights/${productId}` : '/insights';
    const response = await api.get(url);
    return response.data;
  },
};

export default insightService;