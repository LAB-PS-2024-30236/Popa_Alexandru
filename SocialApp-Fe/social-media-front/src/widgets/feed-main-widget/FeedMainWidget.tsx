import React, {useEffect, useState} from "react"; // Import useState
import './styles.css';
import StorySlider from "../../components/feed/StorySlider/StorySlider";
import PostList from "../../components/feed/PostList/PostList";
import FeedSidebar from "../../components/feed/FeedSidebar/FeedSidebar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {sessionSelect} from "../../redux/core/session/selectors";
import {feedSelect} from "./model/selectors";
import {dataRequested} from "./model/effects";
import {authSelect} from "../auth-login-widget/model/selectors";
import {closeSidebar} from "../../redux/core/layout/reducers";
import {closeProfile} from "../profile-overview-widget/model/reducers";
import {Post} from "../../types/content";

const FeedMainWidget: React.FC = () => {
    const userId = useSelector(sessionSelect.userId);
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const feedPosts = useSelector(feedSelect.feedPosts);
    const feedRandomPosts: Post[] = useSelector(feedSelect.feedRandomPosts);
    const feedStories = useSelector(feedSelect.feedStories);
    const isLogged = useSelector(authSelect.isLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDiscoverPosts, setShowDiscoverPosts] = useState(false); // State to control the visibility of discover posts
    const [showButtons, setShowButtons] = useState(true); // State to control the visibility of buttons

    useEffect(() => {
        dispatch(closeProfile());
        dataRequested({userId, jwtToken, dispatch})

        if (!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [jwtToken, userId]);

    const handleDiscoverClick = () => {
        setShowDiscoverPosts(true); // Show the discover posts
        setShowButtons(false); // Hide the buttons
    };

    const handleBackTopClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'}); // Scroll to the top of the page
    };

    return (
        <div className="widget-main">
            <div className="feed-central">
                <>
                    <StorySlider stories={feedStories}/>

                    {feedPosts.length > 0 ? (
                        // If feedPosts has items, display them
                        <>
                            <PostList posts={feedPosts}/>
                            <p className="end-of-post">You are now seeing random posts because the posts from your
                                friends ended</p>
                            {showDiscoverPosts && <PostList posts={feedRandomPosts}/>}
                            {showButtons && (
                                <div className="buttons-container">
                                    <button className="button-75" onClick={handleDiscoverClick}>Discover</button>
                                    <button className="button-75" onClick={handleBackTopClick}>Go Back Top</button>
                                </div>
                            )}
                        </>
                    ) : (
                        // If feedPosts is empty, show the end-of-post message and feedRandomPosts
                        <PostList posts={feedRandomPosts}/>
                    )}


                </>
            </div>
            <FeedSidebar/>
        </div>

    );
};

export default FeedMainWidget;
