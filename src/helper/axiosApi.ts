// axiosApi.ts
import axios from 'axios';

// Create an Axios instance
const axiosApi = axios.create({
  baseURL: 'https://login-otp-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosApi;
