import React from "react";
import Plus from '../../../assets/icons/plus.svg';
import BText from "../../core/BText/BText";
import {Message} from "../../../widgets/messaging-overview-widget/model/types";
import MessageCard from "../MessageCard/MessageCard";
import {useDispatch, useSelector} from "react-redux";
import {changeConversation} from "../../../widgets/messaging-overview-widget/model/reducers";
import {getPersonChats, readPersonChat} from "../../../widgets/messaging-overview-widget/model/effects";
import {sessionSelect} from "../../../redux/core/session/selectors";

interface ChatListProps {
    username: string;
    conversations: Message[];
}

const ChatList: React.FC<ChatListProps> = ({username, conversations}) => {
    const dispatch = useDispatch();
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const profilePicture = useSelector(sessionSelect.profilePicture);
    const userId = useSelector(sessionSelect.userId);
    const fullName = useSelector(sessionSelect.fullName);
    return (
        <div className='chat-list-widget'>
            <div className='chat-list-header'>
                <BText text={username}/>
                <img src={Plus} className='chat-list-header-text'/>
            </div>
            <BText text='Messages' margin={20}/>
            {conversations.map((conv, index) =>
                <MessageCard
                    key={index}
                    photo={conv.senderId.userId === userId ? conv.receiverId.profilePicture : conv.senderId.profilePicture}
                    fullName={ conv.senderId.userId === userId
                        ? conv.receiverId.firstName + ' ' + conv.receiverId.lastName
                        : conv.senderId.firstName + ' ' + conv.senderId.lastName}
                    message={conv.content}
                    date={conv.timestamp}
                    isRead={conv.isRead}
                    onClick={() => {
                        dispatch(changeConversation(conv.senderId.userId === userId ? conv.receiverId : conv.senderId));

                        getPersonChats(
                            {
                                userId: userId,
                                jwtToken,
                                dispatch,
                                receiverId: conv.senderId.userId === userId ? conv.receiverId.userId : conv.senderId.userId})
                    }}/>
            )}
        </div>
    );
}

export default ChatList;