import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://sope-backend.vercel.app',
  baseURL: 'http://localhost:4000'
});

export default api;
