import axios from "axios";

const API_URL = "https://store-payment.onrender.com/api";

export const getProduct = (barCode) => axios.get(`${API_URL}/get/products/${barCode}`);
export const addProduct = (product) => axios.post(`${API_URL}/adding/products`, product);
export const updateProduct = (barCode, product) => axios.put(`${API_URL}/update/products/${barCode}`, product);
export const deleteProduct = (barCode) => axios.delete(`${API_URL}/delete/products/${barCode}`);
