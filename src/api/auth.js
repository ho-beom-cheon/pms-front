import { axiosService } from './http';

function registerUser(userData) {
    return axiosService.post('signup', userData);
}

function loginUser(userData) {
  return axiosService.post('api/user/signin', userData);
}

export { registerUser, loginUser };