import axios from 'axios';
import {refreshToken} from "./handleLogin.jsx";

const axiosRequest = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            await refreshToken();

            return axiosRequest(originalRequest);
        }
        return Promise.reject(error);
    },
);

export default axiosRequest;
