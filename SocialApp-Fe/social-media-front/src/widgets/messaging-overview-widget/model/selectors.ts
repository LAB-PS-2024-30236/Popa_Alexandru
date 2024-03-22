import {RootState} from "../../../redux/store";

export const messageSelect = ({
    conversations: (state: RootState) => state.message.conversations,
    currentChat: (state: RootState) => state.message.chats,
    currentConversation: (state: RootState) => state.message.currentConversation
});