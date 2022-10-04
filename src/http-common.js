import axios from 'axios';

const AxiosCore = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {'Content-type': 'application/json'},
});

export default AxiosCore;
