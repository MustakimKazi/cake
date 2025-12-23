import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (formData) => {
  try {
     const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
           'Content-Type': 'multipart/form-data'
        }
     });
     return response.data;
  } catch (error) {
     console.error("Error adding product:", error);
     throw error;
  }
};

export const fetchStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};
