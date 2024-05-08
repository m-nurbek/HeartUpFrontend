import axios from 'axios';
import { refreshToken } from "./handleAuthentication.jsx";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const axiosRequest = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosRequest(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function(resolve, reject) {
                refreshToken().then(({data}) => {
                    resolve(data);
                    axiosRequest.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                    processQueue(null, data.token);
                    return axiosRequest(originalRequest);
                }).catch((err) => {
                    reject(err);
                    processQueue(err, null);
                    return Promise.reject(err);
                }).then((result) => {
                    resolve(result);
                }).finally(() => {
                    isRefreshing = false;
                });
            });
        }
        return Promise.reject(error);
    },
);

export default axiosRequest;