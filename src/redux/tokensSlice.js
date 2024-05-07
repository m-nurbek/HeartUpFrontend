import {createSlice} from "@reduxjs/toolkit";


export const accessToken = createSlice({
    name: 'accessToken',
    initialState: {
        value: null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.value = action.payload
        },
        removeAccessToken: (state) => {
            state.value = null
        }
    }
})

export const {setAccessToken, removeAccessToken} = accessToken.actions
export const accessTokenReducer = accessToken.reducer


export const refreshToken = createSlice({
    name: 'refreshToken',
    initialState: {
        value: null
    },
    reducers: {
        setRefreshToken: (state, action) => {
            state.value = action.payload
        },
        removeRefreshToken: (state) => {
            state.value = null
        }
    }
})

export const {setRefreshToken, removeRefreshToken} = refreshToken.actions
export const refreshTokenReducer = refreshToken.reducer