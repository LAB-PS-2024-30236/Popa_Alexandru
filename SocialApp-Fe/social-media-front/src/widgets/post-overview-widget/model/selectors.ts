import {RootState} from "../../../redux/store";

export const postSelect = ({
    contentId: (state: RootState) => state.post.contentId,
    user: (state: RootState) => state.post.user,
    photo: (state: RootState) => state.post.photo,
    datePosted: (state: RootState) => state.post.datePosted,
    likes: (state: RootState) => state.post.likes,
    comments: (state: RootState) => state.post.comments,
    description: (state: RootState) => state.post.description
})