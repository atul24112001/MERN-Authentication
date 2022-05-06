import { createSlice } from "@reduxjs/toolkit";
import { AxiosLogin, AxiosSingup } from "../api/index"

const initialState = {
    isLogedIn: false,
    userData: null,
    LoginError: null,
    SingupError: null,
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogedIn = true;
            state.userData = action.payload
        },
        logout: (state) => {
            state.error = null;
            state.isLogedIn = false;
            state.userData = {};
        },
        LoginErr: (state, action) => {
            state.LoginError = action.payload
        },
        SingupErr: (state, action) => {
            state.SingupError = action.payload
        }
    }
});

export const SingUpAction = (Credentials, config) => {
    return async dispatch => {
        const { data } = await AxiosSingup(Credentials, config);
        // console.log(data);
        if (data.statusCode === 200) {
            await dispatch(AuthSlice.actions.login(data))
        } else {
            await dispatch(AuthSlice.actions.SingupErr(data.message))
        }
    }
}

export const LogoutAction = () => {
    return async dispatch => {
        dispatch(AuthSlice.actions.logout());
    }
}

export const LoginAction = (Credentials, config) => {
    return async dispatch => {
        const { data } = await AxiosLogin(Credentials, config);
        // console.log()
        if (data.statusCode === 200) {
            await dispatch(AuthSlice.actions.login(data));
        } else {
            await dispatch(AuthSlice.actions.LoginErr(data.message));
        }
    }
}

export const ClearErrorsAction = () => {
    return async dispatch => {
        dispatch(AuthSlice.actions.LoginErr(null));
        dispatch(AuthSlice.actions.SingupErr(null));
    }
}