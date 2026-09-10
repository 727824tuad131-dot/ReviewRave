// import api from "./api";

// const authService = {
//   register: async (userData) => {
//     return await api.post("/auth/register", userData);
//   },

//   login: async (credentials) => {
//     return await api.post("/auth/login", credentials);
//   },
// };

// export default authService;


import api from './api';

export const authService = {
  login: async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('reviewrave_token', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role) {
        localStorage.setItem('role', response.data.role);
      }
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('reviewrave_token', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role) {
        localStorage.setItem('role', response.data.role);
      }
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('reviewrave_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },

  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('reviewrave_token') || localStorage.getItem('token');
  },
};

export default authService;