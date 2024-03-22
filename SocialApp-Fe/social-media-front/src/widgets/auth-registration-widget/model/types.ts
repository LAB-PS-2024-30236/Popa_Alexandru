import {Dispatch} from "redux";

export type RegisterProps = {
    email: string;
    fullName: string;
    username: string;
    birthdate: string;
    password: string;
    phoneNumber: number;
    dispatch: Dispatch;
}