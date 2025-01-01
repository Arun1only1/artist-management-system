import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

export default $axios;
