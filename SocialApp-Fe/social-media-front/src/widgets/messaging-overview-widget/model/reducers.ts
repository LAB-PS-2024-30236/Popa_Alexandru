import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultConv} from "./defaultState";
import {Chat, Message} from "./types";
import {User} from "../../../types/user";

const messageSlice = createSlice({
    name: 'messageState',
    initialState: defaultConv,
    reducers: {
        conversationsSuccess: (state, action: PayloadAction<Message[]>) => {
            state.conversations = action.payload;
        },
        personChatsSuccess: (state,action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        changeConversation: (state, action: PayloadAction<User>) => {
            state.currentConversation = action.payload;
        }
    }
});

export const { conversationsSuccess, personChatsSuccess, changeConversation } = messageSlice.actions;
export default messageSlice.reducer;