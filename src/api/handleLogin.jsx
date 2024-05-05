import {LOGIN, REFRESH} from "./constants/apiEndpoints"
import axiosRequest from "./axiosConfig.jsx";


export const login = async (email, password) => {
    try {
        const response = await axiosRequest.post(LOGIN, {
            email: email,
            password: password
        });

        const access_token = response.data.access_tokens;
        const refresh_token = response.data.refresh_tokens;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return response.data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
}

export const refreshToken = async () => {
    const refresh_token = getRefreshToken();

    if (refresh_token) {
        try {
            const response = await axiosRequest.post(REFRESH, {
                refresh: refresh_token
            });

            const new_access_token = response.data.access;

            localStorage.setItem("access_token", new_access_token);
            axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`;
        } catch (error) {
            console.error("Error during refresh token", error);
            throw error;
        }
    } else {
        console.error("No refresh token found");

        // Redirect to login page
        window.location.href = "/login";
    }
}

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}