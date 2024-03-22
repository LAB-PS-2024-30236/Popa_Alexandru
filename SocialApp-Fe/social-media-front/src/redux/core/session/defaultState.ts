import {UserSession} from "./types";

export const defaultSession: UserSession = {
    token: localStorage.getItem('token') || '',
    fullName: '',
    username: '',
    email: '',
    userId: localStorage.getItem( 'userId') || '',
    profilePicture: '',
    phoneNumber: 0,
    language: ''
}