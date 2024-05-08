import {LOGIN, LOGOUT, REFRESH, USERS} from "./constants/apiEndpoints"
import axiosRequest from "./axiosConfig.jsx";
import {useDispatch, useSelector} from "react-redux";
import { setUser, removeUser } from "../redux/userSlice.js";
import {removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken} from "../redux/tokensSlice.js";


export const useLogin = () => {
    const dispatch = useDispatch();

    return async (email, password) => {
        try {
            const response = await axiosRequest.post(LOGIN, {
                email: email,
                password: password
            });

            console.log("Login response", response.data)

            const access_token = response.data.access_tokens;
            const refresh_token = response.data.refresh_tokens;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("user", response.data.user_id);

            dispatch(setUser(response.data.user_id));
            dispatch(setAccessToken(access_token));
            dispatch(setRefreshToken(refresh_token));

            axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return response.data;
        } catch (error) {
            console.error("Error during login", error);
            throw error;
        }
    };
}

export const useLogout = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            await axiosRequest.post(LOGOUT, {
                refresh_token: getRefreshToken()
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            dispatch(removeUser());
            dispatch(removeAccessToken());
            dispatch(removeRefreshToken());

            // Redirect to login page
            window.location.href = "/login";
        } catch (error) {
            console.error("Error during logout", error);
            throw error;
        }
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

            return new_access_token;
        } catch (error) {
            console.error("Error during refresh token", error);
            throw error;
        }
    } else {
        console.error("No refresh token found");

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirect to login page
        window.location.href = "/login";
    }
    return null;
}

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}

export const getCurrentUserId = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const selector =  useSelector(state => {
        return state.user
    });
    return selector.user;
}

export const getMyUserInfo = async () => {
    try {
        const response = await axiosRequest.get(USERS);
        console.log("User info", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during get user info", error);
        throw error;
    }
}

