import React, {useEffect} from "react";
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
    const feedRandomPosts: Post [] = useSelector(feedSelect.feedRandomPosts);
    const feedStories = useSelector(feedSelect.feedStories);
    const isLogged = useSelector(authSelect.isLogged);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeProfile());
        dataRequested({userId, jwtToken, dispatch})

        if(!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [jwtToken, userId])

   return (
       <div className="widget-main">
           <div className="feed-central">
               <>
               <StorySlider stories={feedStories}/>
               <PostList posts={feedPosts}/>
               <p className="end-of-post">You are now seeing random posts because the posts from your friends ended</p>

               {console.log("here"+ feedRandomPosts.toString())}
               </>
           </div>
           <FeedSidebar />
       </div>
   );
};

export default FeedMainWidget;
