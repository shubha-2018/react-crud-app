import axios from "axios";

const API = "https://react-crud-backend-6rl3.onrender.com";

export const getUsers = () => axios.get(`${API}/users`);
export const addUser = (data) => axios.post(`${API}/users`, data);
export const updateUser = (id, data) => axios.put(`${API}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);
