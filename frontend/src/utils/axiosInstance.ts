// axiosInstance.ts
import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: '/api', // Set your API base URL here
});

// Request interceptor to add the token to headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Get token from localStorage (or state)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
