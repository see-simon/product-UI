import axios from "axios";

// const API_URL = "https://store-payment.onrender.com/api"; //==== hosted on render.com
    //    const API_URL ="http://springboot-store-payment-app.eu-north-1.elasticbeanstalk.com/api"; /// hosted on AWS Elastic Beanstalk
// const API_URL = "http://localhost:8080/api"; //==== local development

         const API_URL ="http://springboot-jpa-app-env.eba-xddamqpi.eu-north-1.elasticbeanstalk.com/api"; /// hosted on AWS Elastic Beanstalk

export const getProduct = (barCode) => axios.get(`${API_URL}/get/products/${barCode}`);
export const addProduct = (product) => axios.post(`${API_URL}/adding/products`, product);
export const updateProduct = (barCode, product) => axios.put(`${API_URL}/update/products/${barCode}`, product);
export const deleteProduct = (barCode) => axios.delete(`${API_URL}/delete/products/${barCode}`);
export const getAllProducts = () => axios.get(`${API_URL}/get/products`);
