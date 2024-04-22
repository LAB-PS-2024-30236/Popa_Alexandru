import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultPostState} from "./defaultState";

const postCreateSlice= createSlice({
    name: 'postCreationState',
    initialState: defaultPostState,
    reducers: {
        createPostSucces:(state) =>{
            state.error ='NO-ERROR';
        },
        createPostFailed:(state,action:PayloadAction<string>)=>{
            state.error = action.payload;
        }
    }
});

export const {createPostSucces, createPostFailed} = postCreateSlice.actions;

export default postCreateSlice.reducer;