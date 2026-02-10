import axios from "axios";

const API = "https://react-crud-backend-6rl3.onrender.com";

export const getUsers = async () => {
  return await axios.get(`${API}/users`);
};

export const addUser = async (data) => {
  const res = await axios.post(`${API}/users`, data);
  return res.data; // RETURN the added user
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API}/users/${id}`, data);
  return res.data; // RETURN updated user
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/users/${id}`);
  return res.data;
};
