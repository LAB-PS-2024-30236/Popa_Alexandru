import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeSidebar, showSidebar} from "../../redux/core/layout/reducers";
import {sessionSelect} from "../../redux/core/session/selectors";
import LText from "../../components/core/LText/LText";
import Button from "../../components/core/Button/Button";
import Dots from '../../assets/icons/dots-vertical.svg';
import {profileSelect} from "./model/selectors";
import BText from "../../components/core/BText/BText";
import Credits from "../../components/core/Credits/Credits";
import {dataRequested, followUnfollow} from "./model/effects";
import {authSelect} from "../auth-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import './styles.css';
import {setCurrentProfile} from "./model/reducers";
import Line from "../../components/core/Line/Line";
import Camera from '../../assets/icons/camera.svg';
import Lock from '../../assets/icons/lock.svg';
import PostModal from "./PostModal";
import {Post} from "../../types/content";



const ProfileOverviewWidget: React.FC = () => {
    const userId = useSelector(sessionSelect.userId);
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    const profilePhoto = useSelector(profileSelect.profilePicture);
    const username = useSelector(profileSelect.profileUsername);
    const name = useSelector(profileSelect.profileFullName);
    const profileUserId = useSelector(profileSelect.profileUserId);
    const followersNumber = useSelector(profileSelect.followersNumber);
    const followingNumber = useSelector(profileSelect.followingNumber);
    const description = useSelector(profileSelect.profileDescription);
    const posts = useSelector(profileSelect.profilePosts);
    const connection = useSelector(profileSelect.profileConnection);
    const isPrivate = useSelector(profileSelect.profilePrivate);


    const isMyProfile = userId === profileUserId;
    const isLogged = useSelector(authSelect.isLogged);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setCurrentIndex(index);
    };

    // Closes the modal
    const closeModal = () => {
        setCurrentIndex(null);
    };

    const goToPrevPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex! > 0 ? prevIndex! - 1 : prevIndex));
    };
    const goToNextPost = () => {
        setCurrentIndex((prevIndex) =>   prevIndex !== null && prevIndex < posts.length - 1 ? prevIndex + 1 : prevIndex);
    };

    if(profileUserId === '') dispatch(setCurrentProfile(userId));
    useEffect(() => {
        dispatch(showSidebar());

        if(!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
        dataRequested({userId: profileUserId, myUserId: userId, jwtToken, dispatch});
    }, [jwtToken, profileUserId])
    return (
        <div  className={`profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className='profile-header-container'>
                <img src={profilePhoto} className='profile-profile-photo'/>
                <div className='profile-info'>
                    <div className='profile-info-head'>
                        <BText text={username}/>
                        <Button content={isMyProfile ? 'Edit Profile' : connection} onClick={() => {
                            if(!isMyProfile) {
                                followUnfollow({userId: profileUserId, myUserId: userId, jwtToken, dispatch})
                            }
                        }}/>
                        <Button content={isMyProfile ? 'View Archive' : 'Message'} onClick={() => {
                            if(!isMyProfile) {
                                navigate('/messages');
                            }
                        }}/>
                        <img src={Dots}/>
                    </div>
                    <div className='profile-info-number'>
                        <div className='profile-info-numbers'>
                            <BText text={posts.length.toString()}/>
                            <LText text={' posts'}/>
                        </div>
                        <div className='profile-info-numbers'>
                            <BText text={followersNumber.toString()}/>
                            <LText text={' followers'}/>
                        </div>
                        <div className='profile-info-numbers'>
                            <BText text={followingNumber.toString()}/>
                            <LText text={' following'}/>
                        </div>
                    </div>
                    <div className='profile-info-identity'>
                        <BText text={name}/>
                        <LText text={description}/>
                    </div>
                </div>
            </div>
            <Line/>
            {!isMyProfile && (isPrivate && connection !== 'Following') &&
                <div className='profile-no-posts'>
                    <div className='profile-no-posts-icon'>
                        <img src={Lock} className='profile-no-posts-icon-img'/>
                    </div>
                    <h1>This Account is Private</h1>
                </div>
            }
            {posts.length > 0 && (isMyProfile || (isPrivate && connection === "Following") || !isPrivate) &&
                <>
                    <div className='profile-posts-grid'>
                        {posts.map((post, index) => (
                            <div key={post.contentId} className='profile-post-item' onClick={() => openModal(index)}>
                                <img src={post.photo} alt="" className='profile-post-image'/>
                            </div>
                        ))}
                    </div>
                    {currentIndex !== null && (
                        <PostModal
                            post={posts[currentIndex]}
                            handleClose={closeModal}
                            goToPrevPost={goToPrevPost}
                            goToNextPost={goToNextPost}
                        />
                    )}
                </>
            }
            {posts.length === 0 && (isMyProfile || (isPrivate && connection === "Following") || !isPrivate) &&
                <div className='profile-no-posts'>
                    <div className='profile-no-posts-icon'>
                    <img src={Camera} className='profile-no-posts-icon-img'/>
                    </div>
                    <h1>No Posts Yet</h1>
                </div>
            }
            <Credits/>
            <Line/>
        </div>
    );
};

export default ProfileOverviewWidget;
