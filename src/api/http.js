import axios from 'axios';
import { setInterceptors } from './interceptors';

function createAxiosService() {
  return axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout:50000
  });
}

function createAxiosServiceWithAuth(url) {
  const axiosService = axios.create({
    baseURL: `${process.env.VUE_APP_API}/${url}`,
  });
    
  return setInterceptors(axiosService);
}

export const axiosService = createAxiosService();
export const posts = createAxiosServiceWithAuth('posts');