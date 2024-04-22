import {Dispatch} from "redux";

export type PostProps = {
    userId: string;
    photo : string;
    datePosted : string;
    description : string
    dispatch: Dispatch;
}

export type PostState = {
    error: string | null;
}

export type StoryProps = {
    userId: string;
    photo : string;
    datePosted : string;
    dispatch: Dispatch;
}