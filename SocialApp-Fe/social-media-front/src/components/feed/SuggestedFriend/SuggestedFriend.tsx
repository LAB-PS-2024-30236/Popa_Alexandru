import React from "react";
import BText from "../../core/BText/BText";
import LText from "../../core/LText/LText";
import './styles.css';
import {PRIMARY_LIGHT} from "../../../utils/constants";

interface SuggestedFriendProps {
    name: string;
    profilePicture: string;
    commonFollower: string;
}

const SuggestedFriend: React.FC<SuggestedFriendProps> = ({
                                            name,
                                            profilePicture,
                                            commonFollower
                                        }) => {
    return (
        <div className="suggested-friend-card">
            <div className="suggested-friend-text-img">
                <img src={profilePicture} className="suggested-friend-photo"/>
                <div className="suggested-friend-text">
                    <BText text={name}/>
                    <LText text={"Followed by " + commonFollower + " + more"}/>
                </div>
            </div>
            <div className="suggested-friend-follow">
                <BText text='Follow' color={PRIMARY_LIGHT}/>
            </div>
        </div>
    )
}

export default SuggestedFriend;