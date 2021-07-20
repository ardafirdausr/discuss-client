import axios from 'axios'

import { discussAPIEndPoint } from '../config/api';

const axiosAPIInstance = axios.create({
  baseURL: discussAPIEndPoint,
  timeout: 5000
});

axiosAPIInstance.interceptors.request.use(
  async config => {
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config;
  },
  error => {
    Promise.reject(error)
});

axiosAPIInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      window.location = "/auth/logout"
    }

    return Promise.reject(error);
  }
);

export default axiosAPIInstance;
