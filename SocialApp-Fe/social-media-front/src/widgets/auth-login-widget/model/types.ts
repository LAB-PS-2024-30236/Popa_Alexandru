import {Dispatch} from "redux";

export type LoginProps = {
    username: string;
    password: string;
    dispatch: Dispatch;
}

export type AuthState = {
    logged: boolean;
    error: string | null;
}

export type getSessionState = {
    userId: string;
    dispatch: Dispatch;
}