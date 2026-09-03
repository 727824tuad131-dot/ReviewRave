import api from "./api";

const userService = {
  getUsers: async () => {
    return await api.get("/users");
  },

  toggleUserStatus: async (id) => {
    return await api.put(`/users/${id}/toggle-status`);
  },
};

export default userService;