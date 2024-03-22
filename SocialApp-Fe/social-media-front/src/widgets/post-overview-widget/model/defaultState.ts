import {CurrentPost} from "./types";

export const defaultPost: CurrentPost = {
    contentId: '',
    user: {
        userId: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        username: "",
        description: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        joinDate: ""
    },
    photo: '',
    datePosted: '',
    description: '',
    likes: [],
    comments: []
}