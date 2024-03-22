import {User} from "./user";

export type Post = {
    contentId: string;
    user: User;
    photo: string;
    datePosted: string;
    description?: string;
}

export type Comment = {
    userProfilePhoto: string;
    userUsername: string;
    text: string;
    likes: number;
    replies: Comment[];
    commTime: string;
}
