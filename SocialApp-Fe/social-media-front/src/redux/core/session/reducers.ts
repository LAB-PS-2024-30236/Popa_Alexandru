import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultSession} from "./defaultState";
import {UserResponse, UserType} from "./types";

const sessionSlice = createSlice({
    name: 'sessionState',
    initialState: defaultSession,
    reducers: {
        startSession: (state, action: PayloadAction<UserResponse>) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.user.userId);
            state.fullName = action.payload.user.firstName + " " + action.payload.user.lastName;
            state.profilePicture = action.payload.user.profilePicture;
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.userId = action.payload.user.userId;
            state.phoneNumber = action.payload.user.phoneNumber;
            state.language = action.payload.user.language;
        },
        continueSession: (state, action: PayloadAction<UserType>) => {
            state.fullName = action.payload.firstName + " " + action.payload.lastName;
            state.username = action.payload.username;
            state.profilePicture = action.payload.profilePicture;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.phoneNumber = action.payload.phoneNumber;
            state.language = action.payload.language;
        },
        endSession: (state) => {
            state = defaultSession
        }
    }
});

export const { startSession, continueSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;