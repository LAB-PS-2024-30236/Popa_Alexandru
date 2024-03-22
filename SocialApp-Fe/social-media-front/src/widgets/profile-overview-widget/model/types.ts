import {Post} from "../../../types/content";
import {Dispatch} from "redux";

export type ProfileState = {
    connection: string;
    isPrivate: boolean;
    userId: string;
    profilePicture: string;
    fullName: string;
    username: string;
    followers: number;
    following: number;
    description: string;
    posts: Post[];
}

export type ProfileAccount = {
    userId: string;
    profilePicture: string;
    fullName: string;
    username: string;
    bio: string;
    isPrivate: boolean;
}

export type Streak = {
    following: number;
    followers: number;
}

export type ProfileEffectsPayload = {
    userId: string;
    myUserId: string;
    jwtToken: string;
    dispatch: Dispatch;
}