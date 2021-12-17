import axios from 'axios';
import { setInterceptors } from './interceptors';

function createAxiosService() {
  return axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout:50000
  });
}

function createAxiosServiceWithAuth() {
  const axiosService = axios.create({
    baseURL: `${process.env.VUE_APP_API}`,
  });
    
  return setInterceptors(axiosService);
}

export const axiosService = createAxiosServiceWithAuth();
//export const posts = createAxiosServiceWithAuth('api/user/signin');