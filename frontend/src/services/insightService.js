import api from "../api/api";

const insightService = {

  // Get insights for a product
  getByProduct: async (productId) => {
    const response = await api.get(
      `/insights/product/${productId}`
    );

    return response.data;
  }

};

export default insightService;