import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import request from '../../api/ApiRequest';
import { url } from '../../api/Url';

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

export const fetchLogin = (loginData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    console.log("Starting login request...");
    dispatch(loginRequest());
    try {

        const response = await request({
            method: "POST",
            url: url.loginUrl,
            data: {
                email: loginData.email,
                password: loginData.password
            }
        });
        console.log("Login successful:", response?.data?.data);
        const data = response?.data
        dispatch(loginSuccess(data?.data));
    } catch (error: any) {
        console.log("Login failed:", error.data);
        console.log("Error response:", error.response);
        dispatch(loginFailure(error.data || error.message));
    }
};


export default authSlice.reducer;
