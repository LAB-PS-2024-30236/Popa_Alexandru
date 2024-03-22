import React from "react";
import {Post} from "../../../types/content";
import PhotoPost from "../../core/PhotoPost/PhotoPost";
import './styles.css';

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return(
        <div className="photo-list-container">
            {posts.map((post) => {
                return <PhotoPost {...post} key={post.contentId} />
            })}
        </div>
    );
}

export default PostList;