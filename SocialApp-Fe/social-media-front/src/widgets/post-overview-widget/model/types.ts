import {User} from "../../../types/user";
import {Comment} from "../../../types/content";
import {Dispatch} from "redux";

export type CurrentPost = {
    contentId: string;
    user: User;
    photo: string;
    datePosted: string;
    description?: string;
    likes: User[];
    comments: Comment[];
}

export type EffectsPayload = {
    postId: string;
    jwtToken: string;
    dispatch: Dispatch;
}