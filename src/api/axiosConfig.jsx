import axios from 'axios';
import { refreshToken } from "./handleAuthentication.jsx";

const axiosRequest = axios.create({
    baseURL: 'https://d57d-87-255-216-75.ngrok-free.app/',
});

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
                refreshToken().then((token) => {
                    resolve(token);
                    axiosRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    processQueue(null, token);
                    return axiosRequest(originalRequest);
                }).catch((err) => {
                    reject(err);
                    processQueue(err, null);
                    return Promise.reject(err);
                }).finally(() => {
                    isRefreshing = false;
                });
            });
        }

        return Promise.reject(error);
    },
);

export default axiosRequest;