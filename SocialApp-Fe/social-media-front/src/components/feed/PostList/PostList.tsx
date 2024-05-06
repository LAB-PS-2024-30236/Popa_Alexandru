import React, {useEffect, useState} from "react";
import {Post} from "../../../types/content";
import PhotoPost from "../../core/PhotoPost/PhotoPost";
import './styles.css';

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    return(
        <div className={`post-list-container ${isDarkMode ? 'dark-mode' : ''}`}>
            {posts.map((post) => {
                return <PhotoPost {...post} key={post.contentId} />
            })}
        </div>
    );
}

export default PostList;