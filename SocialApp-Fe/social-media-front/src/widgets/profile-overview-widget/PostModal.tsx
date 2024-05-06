import React, {useEffect, useState} from 'react';
import './PostModal.css'; // Make sure you have corresponding CSS styles defined
import HeartIcon from '../../assets/icons/heart.svg'; // Update the path to your actual icons
import Chat from '../../assets/icons/chat.svg';
import SendIcon from '../../assets/icons/send.svg';
import BookmarkIcon from '../../assets/icons/bookmark.svg';
import {Post} from "../../types/content";
import {useSelector} from "react-redux";
import {profileSelect} from "./model/selectors";

import './PostModal.css'

interface PostModalProps {
    post: Post;
    handleClose: () => void;
    goToPrevPost: () => void;
    goToNextPost: () => void;
}


const PostModal: React.FC<PostModalProps> = ({ post, handleClose, goToPrevPost, goToNextPost }) => {
    const username = useSelector(profileSelect.profileUsername);
    const profilePhoto = useSelector(profileSelect.profilePicture);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);
    const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>, callback: () => void) => {
        event.stopPropagation();
        callback();
    };

    return (
        <div className={`post-modal-overlay ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleClose}>
            <div  className={`post-modal-content ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="post-modal-header">
                    <img src={profilePhoto} className="post-modal-username-image"/>
                    <span className="post-modal-username">{username}</span>
                </div>
                <img src={post.photo} alt="Post" className="post-modal-image"/>
                <div className="post-modal-info">
                    <div className="post-modal-icons">
                        <img src={HeartIcon} alt="Like"/>
                        <img src={Chat} alt="Comment"/>
                        <img src={SendIcon} alt="Send"/>
                        <img src={BookmarkIcon} alt="Save" className="post-modal-bookmark"/>
                    </div>
                    <div className="post-modal-likes">{post.numberOfLikes} likes</div>
                    <div className="post-modal-description">{post.description}</div>
                    <div className="post-modal-date">{post.datePosted}</div>
                </div>
                <button onClick={handleClose} className="post-modal-close">✕</button>

            </div>
            <div className="post-modal-nav">
                <button onClick={(e) => handleNavClick(e, goToPrevPost)} className="modal-nav-button prev">Prev
                </button>
                <button onClick={(e) => handleNavClick(e, goToNextPost)} className="modal-nav-button next">Next
                </button>
            </div>
        </div>
    );
};

export default PostModal;
