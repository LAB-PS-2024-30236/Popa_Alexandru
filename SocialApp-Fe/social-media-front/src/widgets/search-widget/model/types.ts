import {Dispatch} from "redux";
import {User} from '../../../types/user'

export type SearchPayload = {
    username: string,
    dispatch: Dispatch;
}

export type SearchResult = {
    searchResult: User[]
}
