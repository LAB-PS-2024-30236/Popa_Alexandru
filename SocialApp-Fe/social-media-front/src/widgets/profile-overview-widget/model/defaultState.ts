import {ProfileState} from "./types";

export const defaultProfile: ProfileState = {
    connection: "",
    isPrivate: false,
    userId: "",
    fullName: "",
    profilePicture: "",
    username: "",
    description: "",
    followers: 0,
    following: 0,
    posts: []
}