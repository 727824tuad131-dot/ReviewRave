import api from "./api";

const productService = {
  getProducts: async () => {
    return await api.get("/products");
  },

  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  getProductSummary: async (id) => {
    return await api.get(`/products/${id}/summary`);
  },

  createProduct: async (productData) => {
    return await api.post("/products", productData);
  },

  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};

export default productService;