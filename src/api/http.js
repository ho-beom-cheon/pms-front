import axios from 'axios';
import { setInterceptors } from './interceptors';

function createAxiosService() {

  const axiosService = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API + "/api/",
  });

  return setInterceptors(axiosService);
}

export const axiosService = createAxiosService();