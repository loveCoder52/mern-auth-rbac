import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/products`;

const toProductFormData = (payload) => {
  const formData = new FormData();
  const {
    images = [],
    removedImagePublicIds,
    replaceImages,
    ...fields
  } = payload;

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  images.forEach((image) => {
    formData.append("images", image);
  });

  if (removedImagePublicIds?.length) {
    formData.append("removedImagePublicIds", JSON.stringify(removedImagePublicIds));
  }

  if (replaceImages !== undefined) {
    formData.append("replaceImages", String(replaceImages));
  }

  return formData;
};

const configWithProgress = (onUploadProgress) => ({
  withCredentials: true,
  onUploadProgress,
});

export const getProducts = () =>
  axios.get(API_URL, {
    withCredentials: true,
  });

export const getProduct = (id) =>
  axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });

export const createProduct = (data, onUploadProgress) =>
  axios.post(API_URL, toProductFormData(data), configWithProgress(onUploadProgress));

export const updateProduct = (id, data, onUploadProgress) =>
  axios.put(`${API_URL}/${id}`, toProductFormData(data), configWithProgress(onUploadProgress));

export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
