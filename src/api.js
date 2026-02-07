import axios from "axios";

const API = "http://localhost:3001/users";

export const getUsers = () => axios.get(API);
export const addUser = (data) => axios.post(API, data);
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);
