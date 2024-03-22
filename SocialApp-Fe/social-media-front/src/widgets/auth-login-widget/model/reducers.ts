import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultAuth} from "./defaultState";

const loginSlice = createSlice({
    name: 'authState',
    initialState: defaultAuth,
    reducers: {
        loginSuccess: (state) => {
           state.logged = true;
           state.error = 'NO-ERROR';
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.logged = false;
            state.error = action.payload;
        },
        registrationSuccess: (state) => {
            state.logged = true;
            state.error = 'NO-ERROR';
        },
        registrationFailure: (state, action: PayloadAction<string>) => {
            state.logged = false;
            state.error = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.logged = false;
            state.error = null;
        }
    }
});

export const { loginSuccess, registrationSuccess, registrationFailure, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;