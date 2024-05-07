import axios from 'axios';
import {refreshToken} from "./handleAuthentication.jsx";

const axiosRequest = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Unauthorized
        originalRequest.retryCount = originalRequest.retryCount ? originalRequest.retryCount : 0;
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.retryCount < 3) {
            originalRequest._retry = true;

            originalRequest.retryCount++;

            await refreshToken();

            return axiosRequest(originalRequest);
        }
        return Promise.reject(error);
    },
);

export default axiosRequest;
