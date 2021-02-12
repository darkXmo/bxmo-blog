import axios from 'axios';
import mock from './mock';

mock();

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/'
});

export default request;