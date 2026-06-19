import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export const getProducts = () =>
  axios.get(API_URL, {
    withCredentials: true,
  });

export const createProduct = (data) =>
  axios.post(API_URL, data, {
    withCredentials: true,
  });

export const updateProduct = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });

export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });