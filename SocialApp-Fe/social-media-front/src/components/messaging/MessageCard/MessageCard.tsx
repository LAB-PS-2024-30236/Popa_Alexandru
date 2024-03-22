import React from "react";
import LText from "../../core/LText/LText";
import BText from "../../core/BText/BText";
import {getTime} from "../../../utils/utils";

interface MessageCardProps {
    photo: string;
    fullName: string;
    message: string;
    date: string;
    isRead: boolean;
    onClick: () => void;
}

const MessageCard: React.FC<MessageCardProps> =
    ({ photo,
         fullName,
         message,
         date,
        isRead,
         onClick}) => {
    return (
        <div className='message-card' onClick={onClick}>
            <img src={photo} className='message-card-img'/>
            <div className='message-card-text'>
                <BText text={fullName}/>
                {isRead && (
                    <LText text={message + ' • ' + getTime(date)}/>
                )}
                {!isRead && (
                    <BText text={message + ' • ' + getTime(date)}/>
                )}
            </div>
        </div>
    )
};

export default MessageCard;