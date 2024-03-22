import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultFeed} from "./defaultState";
import {Post} from "../../../types/content";
import {SuggestedFriend} from "../../../types/user";
import {StoryType} from "../../../types/auth";

const feedSlice = createSlice({
    name: 'feedState',
    initialState: defaultFeed,
    reducers: {
        feedPostsSuccess: (state, action: PayloadAction<Post[]>) => {
            state.feedPosts = action.payload;
        },
        suggestedPostsSuccess: (state, action: PayloadAction<Post[]>) => {
            state.suggestedPosts = action.payload;
        },
        suggestedFriendsSuccess: (state, action: PayloadAction<SuggestedFriend[]>) => {
            state.suggestedFriends = action.payload;
        },
        feedStoriesSuccess: (state, action: PayloadAction<StoryType[]>) => {
            state.feedStories = action.payload;
        }
    }
});

export const { feedPostsSuccess, suggestedPostsSuccess, suggestedFriendsSuccess, feedStoriesSuccess } = feedSlice.actions;
export default feedSlice.reducer;