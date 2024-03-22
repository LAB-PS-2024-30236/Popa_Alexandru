import {RootState} from "../../../redux/store";

export const profileSelect = ({
    profileConnection: (state: RootState) => state.profile.connection,
    profilePrivate: (state: RootState) => state.profile.isPrivate,
    profileUsername: (state: RootState) => state.profile.username,
    profileFullName: (state: RootState) => state.profile.fullName,
    profileUserId: (state: RootState) => state.profile.userId,
    profilePicture: (state: RootState) => state.profile.profilePicture,
    profileDescription: (state: RootState) => state.profile.description,
    followersNumber: (state: RootState) => state.profile.followers,
    followingNumber: (state: RootState) => state.profile.following,
    profilePosts: (state: RootState) => state.profile.posts
});