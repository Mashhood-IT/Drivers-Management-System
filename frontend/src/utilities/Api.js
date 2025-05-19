  import axios from 'axios';

  const API_URL = 'http://localhost:5000/api/driver';

  export const getAllDrivers = () => axios.get(`${API_URL}/getAll-drivers`);
  export const deleteDriver = (id) => axios.delete(`${API_URL}/delete-drivers/${id}`);
  export const updateDriver = (id, data) =>
    axios.put(`${API_URL}/update-drivers/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
     export const getUserById = (id) => axios.get(`${API_URL}/getDriverById/${id}`);
  export const createDriver = (formData) =>
      axios.post(`${API_URL}/create-driver`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });