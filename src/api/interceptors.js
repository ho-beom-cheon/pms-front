import store from '@/store/auth';

export function setInterceptors(axiosService) {
  axiosService.interceptors.request.use(
    function (config) {
      config.headers.Authorization = store.state.token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
    
  axiosService.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axiosService;
}