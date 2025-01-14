import React, {useEffect, useState} from "react";
import SuggestedFriend from "../SuggestedFriend/SuggestedFriend";
import './styles.css';
import BText from "../../core/BText/BText";
import UserCard from "../UserCard/UserCard";
import {DARK_GREY} from "../../../utils/constants";
import LText from "../../core/LText/LText";
import {useSelector} from "react-redux";
import {feedSelect} from "../../../widgets/feed-main-widget/model/selectors";
import {sessionSelect} from "../../../redux/core/session/selectors";

const FeedSidebar: React.FC = () => {
    const suggestedFriends = useSelector(feedSelect.suggestedFriends);
    const fullName = useSelector(sessionSelect.fullName);
    const profilePicture = useSelector(sessionSelect.profilePicture);
    const username = useSelector(sessionSelect.username);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    return (
        <div className={`feed-sidebar-card ${isDarkMode ? 'dark-mode' : ''}`}>
            <UserCard
                name={fullName}
                username={username}
                profilePhoto={profilePicture}/>
            <div className="suggested-card">
                <div className="suggested-text">
                    <BText text="Suggested for you" color={isDarkMode ? '#ccc' : DARK_GREY}/>
                    <BText text="See all"/>
                </div><>
                {suggestedFriends.map((user) => (
                    <SuggestedFriend
                    name={user.username}
                    profilePicture={user.profilePicture}
                    commonFollower={user.commonFriend.username}
                    key={user.userId}
                    userId={user.userId}/>
                    )
                )}</>
            </div>
            <div className="suggested-card">
                <LText text="About • Help • Privacy • Terms • Language" color={isDarkMode ? '#ccc' : DARK_GREY}/>
                <LText text="©2023 YOLO FROM POPA" color={isDarkMode ? '#ccc' : DARK_GREY}/>
            </div>

        </div>
    )
}

export default FeedSidebar;