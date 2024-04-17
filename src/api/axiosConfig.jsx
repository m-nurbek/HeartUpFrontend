import axios from 'axios';

const username = 'admin';
const password = '1';
const token = btoa(`${username}:${password}`);

const axiosRequest = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosRequest.defaults.headers.common['Authorization'] = `Basic ${token}`;

export default axiosRequest;
