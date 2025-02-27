import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://r2zkgqs6-7026.inc1.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`Error: ${error.response?.status}`, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
