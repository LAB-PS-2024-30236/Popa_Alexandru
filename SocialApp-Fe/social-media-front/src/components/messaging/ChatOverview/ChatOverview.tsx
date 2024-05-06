import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CompatClient, Stomp} from '@stomp/stompjs';
import {useNavigate} from "react-router-dom";

import Phone from '../../../assets/icons/phone.svg';
import Video from '../../../assets/icons/video.svg';
import Dots from '../../../assets/icons/dots-vertical.svg';
import Chat from '../../../assets/icons/chat.svg';
import Image from '../../../assets/icons/image.svg';
import Heart from '../../../assets/icons/heart.svg';
import Send from '../../../assets/icons/send.svg';

import BText from "../../core/BText/BText";
import LText from "../../core/LText/LText";
import Button from "../../core/Button/Button";
import MessageBubble from "../MessageBubble/MessageBubble";

import {sessionSelect} from "../../../redux/core/session/selectors";
import {messageSelect} from "../../../widgets/messaging-overview-widget/model/selectors";
import {setCurrentProfile} from "../../../widgets/profile-overview-widget/model/reducers";
import {getMessageShape} from "../../../utils/utils";
import {newChatMessageReceived} from "../../../widgets/messaging-overview-widget/model/reducers";

import {storage} from "../../../firebase";
import {getDownloadURL, ref, uploadBytes} from '@firebase/storage';
import {v4 as uuidv4} from 'uuid';

const ChatOverview = () => {
    const currentConversation = useSelector(messageSelect.currentConversation);
    const messages = useSelector(messageSelect.currentChat);
    const myUserId = useSelector(sessionSelect.userId);
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const isFirst = currentConversation.userId === '';
    const stompClientRef = useRef<CompatClient | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageMessage, setImageMessage] = useState('');

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    const connect = () => {
        const socket = new WebSocket(`ws://localhost:8083/chat/websocket?token=${jwtToken}`);
        const stompClient = Stomp.over(socket);
        stompClient.debug = console.log;

        stompClient.connect({}, () => {
            setConnected(true);
            console.log('Connected: ' + stompClient.connected);
            stompClientRef.current = stompClient;

            const receiveQueue = `/queue/${currentConversation.userId}/${myUserId}`;
            stompClient.subscribe(receiveQueue, message => {
                console.log("Received message", message.body);
                const parsedMessage = JSON.parse(message.body);
                const chatMessage = {
                    senderId: parsedMessage.senderId,
                    receiverId: parsedMessage.receiverId,
                    content: parsedMessage.content,
                    timestamp: parsedMessage.timestamp,
                    isRead: false,
                    isEdited: false
                };
                dispatch(newChatMessageReceived(chatMessage));
            });
        }, (error: any) => {
            console.error('Connection error:', error);
        });
    };

    const disconnect = () => {
        if (connected && stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                console.log("Disconnected");
                setConnected(false);
            });
        }
    };

    const sendMessage = () => {
        if (connected && stompClientRef.current) {
            const messageToSend = {
                senderId: myUserId,
                receiverId: currentConversation.userId,
                content: message,
                timestamp: new Date().toISOString()
            };
            console.log(messageToSend.content)
            if (myUserId === currentConversation.userId) {
                const sendQueue = `/queue/${myUserId}/${currentConversation.userId}`;
                stompClientRef.current.send(sendQueue, {}, JSON.stringify(messageToSend));
                const sendEndpoint = "/app/sendMessage";
                stompClientRef.current.send(sendEndpoint, {}, JSON.stringify(messageToSend));
            } else {
                const sendQueue = `/queue/${myUserId}/${currentConversation.userId}`;
                stompClientRef.current.send(sendQueue, {}, JSON.stringify(messageToSend));
                const sendQueue1 = `/queue/${currentConversation.userId}/${myUserId}`;
                stompClientRef.current.send(sendQueue1, {}, JSON.stringify(messageToSend));
                const sendEndpoint = "/app/sendMessage";
                stompClientRef.current.send(sendEndpoint, {}, JSON.stringify(messageToSend));
            }

            setMessage('');
            setImageMessage('');
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    };

    const handleKeyPress = (event: { key: string; shiftKey: any; preventDefault: () => void; }) => {
        if (event.key === 'Enter' && !event.shiftKey && message !== '') {
            event.preventDefault();
            sendMessage();
        }
    };
    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [currentConversation.userId, jwtToken]);

    const uploadImage = async (file: File) => {
        const imageRef = ref(storage, `messages/${myUserId}_${file.name}_${uuidv4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Failed to upload image: ", error);
            throw error;
        }
    };
    useEffect(() => {
        if (imageMessage) {
            setMessage(imageMessage);
            sendMessage();
            setImageMessage('');
        }
    }, [imageMessage]);
    const sendImageMessage = async () => {
        if (file) {
            console.log('Uploading file:', file.name);
            try {
                const imageUrl = await uploadImage(file);
                console.log('Image URL:', imageUrl);
                setImageMessage(imageUrl);
                setMessage(imageMessage);
            } catch (error) {
                console.error("Failed to send image message: ", error);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            sendImageMessage();
        }
    };

    return (
        <div>
            {isFirst ? (
                <div className='chat-overview-opening'>
                    <div className='chat-overview-opening-container'>
                        <div className='chat-overview-opening-icon-back'>
                            <img src={Chat} className='chat-overview-opening-icon' alt="Chat Icon"/>
                        </div>
                        <BText text='Your messages'/>
                        <LText text='Send private photos and messages to a friend or group.'/>
                        <Button content='Send message' onClick={() => console.log('Send message')}/>
                    </div>
                </div>
            ) : (
                <div className={`chat-overview ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className={`chat-overview-header ${isDarkMode ? 'dark-mode' : ''}`}>
                        <div className='chat-overview-header-info'>
                            <img
                                src={currentConversation.profilePicture}
                                alt="Profile"
                                className='chat-overview-header-picture'
                                onClick={() => {
                                    dispatch(setCurrentProfile(currentConversation.userId));
                                    navigate('/profile');
                                }}
                            />
                            <BText text={`${currentConversation.firstName} ${currentConversation.lastName}`}
                                   onClick={() => {
                                       dispatch(setCurrentProfile(currentConversation.userId));
                                       navigate('/profile');
                                   }}/>
                        </div>
                        <div className='chat-overview-header-actions'>
                            <img src={Phone} alt="Phone Call" className='chat-overview-icon'/>
                            <img src={Video} alt="Video Call" className='chat-overview-icon'/>
                            <img src={Dots} alt="More Options" className='chat-overview-icon' onClick={() => {
                                dispatch(setCurrentProfile(currentConversation.userId));
                                navigate('/profile');
                            }}/>
                        </div>
                    </div>
                    <div className='chat-overview-messages-container' ref={messagesEndRef}>
                        {messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                content={msg.content}
                                isMine={msg.senderId === myUserId}
                                isDarkMode={isDarkMode}
                            />
                        ))}
                    </div>
                    <div className={`chat-overview-bottom ${isDarkMode ? 'dark-mode' : ''}`}>
                        <div className='chat-overview-form'>
                            <input
                                type='text'
                                className='chat-overview-chat'
                                placeholder='Message...'
                                value={message}
                                onChange={onMessageChange}
                                onKeyDown={handleKeyPress}
                            />
                            {message.length === 0 && (
                                <div>
                                    <img
                                        src={Image}
                                        alt="Send Image"
                                        className='chat-overview-icon'
                                        onClick={() => fileInputRef.current?.click()}
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{display: 'none'}}
                                    />
                                    <img src={Heart} alt="Send Love" className='chat-overview-icon'/>
                                </div>
                            )}
                            {message.length > 0 && (
                                <img
                                    src={Send}
                                    alt="Send Message"
                                    className='chat-overview-icon'
                                    onClick={sendMessage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatOverview;