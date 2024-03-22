import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProfile} from "./defaultState";
import {ProfileAccount, Streak} from "./types";
import {Post} from "../../../types/content";

const profileSlice = createSlice({
    name: 'profileState',
    initialState: defaultProfile,
    reducers: {
        setCurrentProfile: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        refreshProfile: (state, action: PayloadAction<ProfileAccount>) => {
            state.profilePicture = action.payload.profilePicture;
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.fullName = action.payload.fullName;
            state.isPrivate = action.payload.isPrivate;
            state.description = action.payload.bio;
        },
        addConnection: (state, action: PayloadAction<string>) => {
            state.connection = action.payload;
        },
        addPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addStreak: (state, action: PayloadAction<Streak>) =>{
            state.followers = action.payload.followers;
            state.following = action.payload.following;
        },
        closeProfile: (state) => {
            state.userId = '';
        }
    }
});

export const { addPosts, addStreak, addConnection, refreshProfile, setCurrentProfile, closeProfile } = profileSlice.actions;
export default profileSlice.reducer;