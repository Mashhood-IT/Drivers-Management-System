import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllDrivers = () =>
  axios.get(`${API_URL}/driver/getAll-drivers`);
export const deleteDriver = (id) =>
  axios.delete(`${API_URL}/driver/delete-drivers/${id}`);
export const updateDriver = (id, data) =>
  axios.put(`${API_URL}/driver/update-drivers/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getUserById = (id) =>
  axios.get(`${API_URL}/driver/getDriverById/${id}`);
export const createDriver = (formData) =>
  axios.post(`${API_URL}/driver/create-driver`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

//  ----------------AUTH------------
export const Login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
}