import api from "../api/api";

const reviewService = {

  // Get reviews for a product
  getByProduct: async (productId) => {
    const response = await api.get(
      `/reviews/product/${productId}`
    );

    return response.data;
  },

  // Ingest a review
  ingest: async (data) => {
    const response = await api.post(
      "/reviews/ingest",
      data
    );

    return response.data;
  }

};

export default reviewService;