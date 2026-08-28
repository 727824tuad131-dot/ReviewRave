import api from "../api/api";

const productService = {

  // Get all products
  getAll: async () => {
    const response = await api.get(
      "/products"
    );

    return response.data;
  },

  // Create product
  create: async (data) => {
    const response = await api.post(
      "/products",
      data
    );

    return response.data;
  },

  // Get product summary
  getSummary: async (id) => {
    const response = await api.get(
      `/products/${id}/summary`
    );

    return response.data;
  }

};

export default productService;