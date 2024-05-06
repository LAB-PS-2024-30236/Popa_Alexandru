import React, { useEffect, useState } from "react";
import './styles.css';
import StorySlider from "../../components/feed/StorySlider/StorySlider";
import PostList from "../../components/feed/PostList/PostList";
import FeedSidebar from "../../components/feed/FeedSidebar/FeedSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionSelect } from "../../redux/core/session/selectors";
import { feedSelect } from "./model/selectors";
import { dataRequested } from "./model/effects";
import { authSelect } from "../auth-login-widget/model/selectors";
import { closeSidebar } from "../../redux/core/layout/reducers";
import { closeProfile } from "../profile-overview-widget/model/reducers";
import {StoryType} from "../../types/auth";
import {User} from "../../types/user";

interface GroupedStories {
    user: User;
    stories: StoryType[];
}

const FeedMainWidget: React.FC = () => {
    const userId = useSelector(sessionSelect.userId);
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const feedPosts = useSelector(feedSelect.feedPosts);
    const feedRandomPosts = useSelector(feedSelect.feedRandomPosts);
    const feedStories = useSelector(feedSelect.feedStories);
    const isLogged = useSelector(authSelect.isLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDiscoverPosts, setShowDiscoverPosts] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        dispatch(closeProfile());
        dataRequested({ userId, jwtToken, dispatch })
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);

        if (!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [jwtToken, userId]);


    const groupedStories = feedStories.reduce<Record<string, StoryType[]>>((acc, story) => {
        const userId = story.user.userId;
        if (!acc[userId]) {
            acc[userId] = [];
        }
        acc[userId].push(story);
        return acc;
    }, {});

    const storiesPerUser: GroupedStories[] = Object.values(groupedStories).map(stories => ({
        user: stories[0].user,
        stories
    }));

    const handleDiscoverClick = () => {
        setShowDiscoverPosts(true);
        setShowButtons(false);
    };

    const handleBackTopClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`widget-main ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="feed-central">
                <>
                    <StorySlider stories={storiesPerUser} />

                    {feedPosts.length > 0 ? (
                        <>
                            <PostList posts={feedPosts} />
                            <p className="end-of-post">You are now seeing random posts because the posts from your friends ended</p>
                            {showDiscoverPosts && <PostList posts={feedRandomPosts} />}
                            {showButtons && (
                                <div className="buttons-container">
                                    <button className="button-75" onClick={handleDiscoverClick}>Discover</button>
                                    <button className="button-75" onClick={handleBackTopClick}>Go Back Top</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <PostList posts={feedRandomPosts} />
                    )}
                </>
            </div>
            <FeedSidebar />
        </div>
    );
};

export default FeedMainWidget;
