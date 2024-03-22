import React from "react";
import {Post} from "../../../types/content";
import LText from "../LText/LText";
import BText from "../BText/BText";
import Heart from '../../../assets/icons/heart.svg';
import Chat from '../../../assets/icons/chat.svg';
import Send from '../../../assets/icons/send.svg';
import Bookmark from '../../../assets/icons/bookmark.svg';
import Dots from '../../../assets/icons/dots-vertical.svg';
import Line from "../Line/Line";
import "./styles.css";
import {MEDIUM_GREY} from "../../../utils/constants";
import {useDispatch} from "react-redux";
import {setCurrentProfile} from "../../../widgets/profile-overview-widget/model/reducers";
import {useNavigate} from "react-router-dom";

const PhotoPost: React.FC<Post> = ({user,
                              photo,
                              description,}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="post-container">
            <div className="post-topbar">
                <div className="post-topbar-left">
                    <img className="post-profile-photo" src={user.profilePicture} onClick={() => {
                        dispatch(setCurrentProfile(user.userId));
                        navigate('/profile');
                    }}/>
                    <div>
                        <BText text={user.firstName + " " + user.lastName} onClick={() => {
                            dispatch(setCurrentProfile(user.userId));
                            navigate('/profile');
                        }}/>
                        <p onClick={() => {
                            dispatch(setCurrentProfile(user.userId));
                            navigate('/profile');
                        }}>{user.username}</p>
                    </div>
                </div>
                <img className="post-icon" src={Dots}/>
            </div>
            <div className="post-image-container">
                <img className="post-image" src={photo}/>
            </div>
            <div className="post-under-img-container">
                <div className="post-actions">
                    <div className="post-like-comm-share">
                        <img className="post-icon" src={Heart}/>
                        <img className="post-icon" src={Chat}/>
                        <img className="post-icon" src={Send}/>
                    </div>
                    <img className="post-icon" src={Bookmark}/>
                </div>
                <div className="post-actions">
                    <div className="post-likes">
                    </div>
                    <div className="post-liked-text">
                        <LText text={'liked'}/>
                        <BText text={"popa1"}/>
                        <LText text={' and '}/>
                        <BText text={70 + ' more'}/>
                    </div>
                </div>
                {description && <div className="post-description">
                    <BText text={user.username}/>
                    <LText text={description}/>
                </div>}
                <BText text="View comments" color={MEDIUM_GREY}/>
                <Line />
            </div>
        </div>
    )
}

export default PhotoPost;