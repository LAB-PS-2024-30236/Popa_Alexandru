import {request} from "../../../components/core/Request/request";
import { MESSAGES_BASE_URL } from "../../../utils/constants";
import {conversationsSuccess, personChatsSuccess} from "./reducers";
import {EffectsPayload} from "../../feed-main-widget/model/types";
import {ChatEffectsPayload, ReadChatEffectsPayload} from "./types";

export const dataRequested = async ({ userId, jwtToken, dispatch}: EffectsPayload) => {
    await request({
        url: MESSAGES_BASE_URL + 'getPersonConversations/' + userId,
        method: 'GET',
        headers: {
            'Authorization' : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(conversationsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })
}

export const getPersonChats = async ({ userId, jwtToken, dispatch, receiverId}: ChatEffectsPayload) => {
    await request({
        url: MESSAGES_BASE_URL + 'getPersonChat/' + userId + '/' + receiverId,
        method: 'GET',
        data: {userId, receiverId},
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dispatch(personChatsSuccess(response.data));
    }).catch((error) => {
        console.error(error);
    })
}

export const readPersonChat = async ({userId, messageId, jwtToken, dispatch}: ReadChatEffectsPayload) => {
    await request({
        url: MESSAGES_BASE_URL + 'updateReadStatus',
        method: 'POST',
        data: {messageId, isRead: false},
        headers: {
            Authorization : "Bearer " + jwtToken
        }
    }).then((response) => {
        dataRequested({userId, jwtToken, dispatch});
    }).catch((error) => {
        console.error(error);
    })
}