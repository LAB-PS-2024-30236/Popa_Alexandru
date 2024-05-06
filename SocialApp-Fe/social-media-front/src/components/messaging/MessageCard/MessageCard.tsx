import React from "react";
import LText from "../../core/LText/LText";
import BText from "../../core/BText/BText";
import { getTime } from "../../../utils/utils";

interface MessageCardProps {
    photo: string;
    fullName: string;
    message: string;
    date: string;
    isRead: boolean;
    isDarkMode: boolean;
    onClick: () => void;
}

const MessageCard: React.FC<MessageCardProps> =
    ({ photo,
         fullName,
         message,
         date,
         isRead,
         isDarkMode,
         onClick}) => {

        const formatMessage = (msg: string) => {
            if (msg.startsWith('https')) {
                return 'Sent a photo'+ ' • ' + getTime(date);
            }
            return msg + ' • ' + getTime(date);
        };

        return (
            <div className={`message-card ${isDarkMode ? 'dark-mode' : ''}`} onClick={onClick}>
                <img src={photo} className='message-card-img' alt={fullName}/>
                <div className='message-card-text'>
                    <BText text={fullName}/>
                    {isRead ? (
                        <LText text={formatMessage(message)}/>
                    ) : (
                        <BText text={formatMessage(message)}/>
                    )}
                </div>
            </div>
        )
    };

export default MessageCard;
