import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultUsers} from "./defaultState";
import {UsersState} from "./types";

const usersSlice = createSlice(
    {
        name: 'usersSlice',
        initialState: defaultUsers,
        reducers: {
            usersLoggedSucces:(state, action: PayloadAction<UsersState>)=>{
                state.userLoggedRequestHelper= action.payload.userLoggedRequestHelper;
                state.totalNumberOfLoggedUsers= action.payload.totalNumberOfLoggedUsers;
            }
        }
    }
);

export const {usersLoggedSucces} = usersSlice.actions;

export default usersSlice.reducer;