import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultPost} from "./defaultState";
import {Comment, Post} from "../../../types/content";

const postSlice = createSlice({
    name: 'postState',
    initialState: defaultPost,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.contentId = action.payload.contentId;
            state.user = action.payload.user;
            state.photo = action.payload.photo;
            state.datePosted = action.payload.datePosted;
            state.description = action.payload.description;
        },
        addComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
        }

    }
});

export const { addPost, addComments } = postSlice.actions;
export default postSlice.reducer;