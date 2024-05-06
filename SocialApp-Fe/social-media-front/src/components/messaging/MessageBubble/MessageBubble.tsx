import React from "react";

// @ts-ignore
const MessageBubble = ({ content, isMine, isDarkMode }) => {
    const bubbleClass = `message-bubble ${isMine ? 'my-message' : 'your-message'} ${isDarkMode ? 'dark-mode' : ''}`;

    return (
        <div className={bubbleClass}>
            <p>{content}</p>
        </div>
    );
};

export default MessageBubble;
