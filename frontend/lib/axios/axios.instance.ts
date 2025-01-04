import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default $axios;
