import axios from 'axios'

import { endpoint } from '../config/api';

const axiosApiInstance = axios.create({
  baseURL: endpoint,
  timeout: 5000
});

axiosApiInstance.interceptors.request.use(
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

axiosApiInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      window.location = "/logout"
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;