import React from "react";
import {Comment} from "../../../types/content";
import Heart from '../../../assets/icons/heart.svg';
interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
    return (
        <div className='comment-card'>
            <div className='comment-side-card'>
                <img className='comment-profile-picture' src={comment.userProfilePhoto}/>
                <div className='comment-text-container'>
                    <div className='comment-text-upper'>
                        <p>{comment.userUsername}</p>
                        <p>{comment.text}</p>
                    </div>
                    <div className='comment-text-lower'>
                        <p>{comment.commTime}</p>
                        <p>{comment.likes}</p>
                        <p>Reply</p>
                    </div>
                    <p>View replies ({comment.replies.length})</p>
                </div>
            </div>
            <img src={Heart} className='comment-card-like'/>
        </div>
    )
}

export default CommentCard;