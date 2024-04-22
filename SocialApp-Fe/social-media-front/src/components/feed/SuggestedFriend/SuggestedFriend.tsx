import React from "react";
import BText from "../../core/BText/BText";
import LText from "../../core/LText/LText";
import './styles.css';
import {PRIMARY_LIGHT} from "../../../utils/constants";
import {followUnfollow} from "../../../widgets/profile-overview-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../../redux/core/session/selectors";
import {setCurrentProfile} from "../../../widgets/profile-overview-widget/model/reducers";
import {useNavigate} from "react-router-dom";

interface SuggestedFriendProps {
    name: string;
    profilePicture: string;
    commonFollower: string;
    userId: string;
}

const SuggestedFriend: React.FC<SuggestedFriendProps> = ({
                                                             name,
                                                             profilePicture,
                                                             commonFollower,
                                                             userId,
                                                         }) => {
    const userId1 = useSelector(sessionSelect.userId);
    const dispatch = useDispatch();
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const navigate = useNavigate();
    const handleClick = () => {
        followUnfollow({ userId: userId, myUserId: userId1, jwtToken, dispatch })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Follow/Unfollow failed:", error);
            });
    };

    return (
        <div className="suggested-friend-card">
            <div className="suggested-friend-text-img">
                <img src={profilePicture} className="suggested-friend-photo"
                     onClick={() => {
                         dispatch(setCurrentProfile(userId));
                         navigate('/profile');}}
                />
                <div className="suggested-friend-text">
                    <BText text={name} onClick={() => {
                        dispatch(setCurrentProfile(userId));
                        navigate('/profile');
                    }}/>
                    <LText text={"Followed by " + commonFollower + " + more"}/>
                </div>
            </div>
            <div className="suggested-friend-follow">
                <BText text='Follow' color={PRIMARY_LIGHT} onClick={handleClick}/>
            </div>
        </div>
    );
}

export default SuggestedFriend;
