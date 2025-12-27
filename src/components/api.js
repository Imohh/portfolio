import axios from "axios";

const api = axios.create({
  baseURL: 'https://portfolio-backend-wheat-three.vercel.app',
});

export default api;