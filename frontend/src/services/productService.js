// import api from "./api";

// const productService = {
//   getProducts: async () => {
//     return await api.get("/products");
//   },

//   getProductById: async (id) => {
//     return await api.get(`/products/${id}`);
//   },

//   getProductSummary: async (id) => {
//     return await api.get(`/products/${id}/summary`);
//   },

//   createProduct: async (productData) => {
//     return await api.post("/products", productData);
//   },

//   updateProduct: async (id, productData) => {
//     return await api.put(`/products/${id}`, productData);
//   },

//   deleteProduct: async (id) => {
//     return await api.delete(`/products/${id}`);
//   },
// };

// export default productService;


import api from './api';

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  createProduct: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;