import {User} from "../../../types/user";
import {Dispatch} from "redux";

export type Message = {
    senderId: User;
    receiverId: User;
    content: string;
    timestamp: string;
    isRead: boolean;
    isEdited: boolean;
}

export type Chat = {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    isEdited: boolean;
}

export type MessageState = {
    currentConversation: User;
    chats: Chat[];
    conversations: Message[];
}

export type ChatEffectsPayload = {
    userId: string;
    receiverId: string;
    jwtToken: string;
    dispatch: Dispatch;
}

export type ReadChatEffectsPayload = {
    messageId: string;
    userId: string;
    jwtToken: string;
    dispatch: Dispatch;
}