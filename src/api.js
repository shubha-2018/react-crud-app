import axios from "axios";

const API = process.env.REACT_APP_API_URL || "https://react-crud-backend-6rl3.onrender.com";

export const getUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data || [];
};

export const addUser = async (data) => {
  const res = await axios.post(`${API}/users`, data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API}/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/users/${id}`);
  return res.data;
};
