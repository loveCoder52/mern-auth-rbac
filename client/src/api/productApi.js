import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
  withCredentials: true,
});

export default API;