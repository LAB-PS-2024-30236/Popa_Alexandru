import {MessageState} from "./types";

export const defaultConv: MessageState = {
    currentConversation: {
        userId: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        username: "",
        description: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        joinDate: ""
    },
    chats: [],
    conversations: []
}