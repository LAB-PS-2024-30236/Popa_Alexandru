import {Dispatch} from "redux";


export type UsersState = {
    totalNumberOfLoggedUsers: number;
    userLoggedRequestHelper: UserLogged[]
}



export type UserLogged = {
    profilePhoto: string,
    username: string,
    name: string,
    timeWhenLogged: string,
    userId: string
}

export type UserLoggedPayload = {
    jwtToken: string,
    dispatch: Dispatch;
}