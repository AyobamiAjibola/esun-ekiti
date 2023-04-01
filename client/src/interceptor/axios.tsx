import axios from 'axios';
const BASE_URL = 'https://esun-server-api.onrender.com/';

export default axios.create({
  baseURL: BASE_URL
});
