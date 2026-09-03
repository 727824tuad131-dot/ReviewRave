import api from "./api";

const reviewService = {
  getReviews: async (productId) => {
    return await api.get(`/reviews/product/${productId}`);
  },

  ingestReview: async (reviewData) => {
    return await api.post("/reviews/ingest", reviewData);
  },

  deleteReview: async (id) => {
    return await api.delete(`/reviews/${id}`);
  },
};

export default reviewService;