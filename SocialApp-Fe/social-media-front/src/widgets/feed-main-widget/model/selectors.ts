import {RootState} from "../../../redux/store";

export const feedSelect = ({
    suggestedPosts: (state: RootState) => state.feed.suggestedPosts,
    feedPosts: (state: RootState) => state.feed.feedPosts,
    feedStories: (state: RootState) => state.feed.feedStories,
    suggestedFriends: (state: RootState) => state.feed.suggestedFriends
});