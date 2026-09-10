// import api from "./api";

// const reviewService = {
//   getReviews: async (productId) => {
//     return await api.get(`/reviews/product/${productId}`);
//   },

//   ingestReview: async (reviewData) => {
//     return await api.post("/reviews/ingest", reviewData);
//   },

//   deleteReview: async (id) => {
//     return await api.delete(`/reviews/${id}`);
//   },
// };

// export default reviewService;


import api from './api';

export const reviewService = {
  submitReview: async (data) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },
  getReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },
};

export default reviewService;