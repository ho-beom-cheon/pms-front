import axios from 'axios';
import { setInterceptors } from './interceptors';

function createAxiosService() {
  return axios.create({
    // withCredentials: true,
    baseURL: process.env.VUE_APP_API,
  });
}

function createAxiosServiceWithAuth(url) {
  const axiosService = axios.create({
    // withCredentials: true,
    baseURL: `${process.env.VUE_APP_API}/${url}`,
  });

  return setInterceptors(axiosService);
}

export const axiosService = createAxiosService();
export const posts = createAxiosServiceWithAuth('posts');