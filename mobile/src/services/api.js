import axios from 'axios';
import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: `http://192.168.0.10:3000`,
});

export default api;
