import axios from "axios";

// const API = "https://user-backend.onrender.com";
const API = "http://localhost:5000";


export const getUsers = () => axios.get(`${API}/users`);
export const addUser = (data) => axios.post(`${API}/users`, data);
export const updateUser = (id, data) => axios.put(`${API}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);
