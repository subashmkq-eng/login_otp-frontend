// axiosApi.ts
import axios from 'axios';

// Create an Axios instance
const axiosApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosApi;