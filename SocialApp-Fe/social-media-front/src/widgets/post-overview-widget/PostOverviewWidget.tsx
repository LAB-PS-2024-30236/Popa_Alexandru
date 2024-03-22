import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postSelect} from "./model/selectors";
import {dataRequested} from "./model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";
import {closeSidebar} from "../../redux/core/layout/reducers";
import {authSelect} from "../auth-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import Dots from '../../assets/icons/dots-vertical.svg';
import CommentCard from "../../components/post/CommentCard/CommentCard";
import Heart from "../../assets/icons/heart.svg";
import Chat from "../../assets/icons/chat.svg";
import Send from "../../assets/icons/send.svg";
import Bookmark from "../../assets/icons/bookmark.svg";
import LText from "../../components/core/LText/LText";
import BText from "../../components/core/BText/BText";
import Line from "../../components/core/Line/Line";

const PostOverviewWidget: React.FC = () => {
    const image = useSelector(postSelect.photo);
    const user = useSelector(postSelect.user);
    const comments = useSelector(postSelect.comments);
    const likes = useSelector(postSelect.likes);
    const description = useSelector(postSelect.description);
    const date = useSelector(postSelect.datePosted);
    const postId = useSelector(postSelect.contentId);

    const jwtToken = useSelector(sessionSelect.jwtToken);
    const isLogged = useSelector(authSelect.isLogged);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dataRequested({postId, jwtToken, dispatch});

        if(!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [])
    return (
        <div className="widget-main">
            <img src={image} className='post-img'/>
            <div className='post-side'>
                <div className='post-side-header'>
                    <div className='post-user-card'>
                        <img src={user.profilePicture} className='post-profile-photo'/>
                        <p>{user.username}</p>
                    </div>
                    <img src={Dots} className='post-header-settings'/>
                </div>
                <div className='post-side-middle'>
                    <p className='post-description'>{description}</p>
                    {comments.map((comment) => <CommentCard comment={comment}/>)}
                </div>
                <div className='post-side-bottom'>
                    <div className="post-actions">
                        <div className="post-like-comm-share">
                            <img className="post-icon" src={Heart}/>
                            <img className="post-icon" src={Chat}/>
                            <img className="post-icon" src={Send}/>
                        </div>
                        <img className="post-icon" src={Bookmark}/>
                    </div>
                    <div className="post-actions">
                        <img src={likes[0].profilePicture}/>
                        <div className="post-liked-text">
                            <LText text={'Liked by'}/>
                            <BText text={likes[0].username}/>
                            <LText text={' and '}/>
                            <BText text={likes.length + ' more'}/>
                        </div>
                    </div>
                    <p>{date}</p>
                    <Line/>
                    <div className='post-add-comment'>
                        <LText text='Add a comment...'/>
                        <BText text='Post'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostOverviewWidget;