import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const addUser = (data) => axios.post(`${BASE_URL}/users`, data);
export const updateUser = (id, data) =>
  axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/users/${id}`);
