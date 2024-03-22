import React from "react";
import BText from "../../core/BText/BText";
import './styles.css'
import {DARK_GREY, PRIMARY_LIGHT} from "../../../utils/constants";

interface UserCardProps {
    name: string;
    username: string;
    profilePhoto: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, username, profilePhoto}) => {
    return (
        <div className="user-card">
            <div className="user-card-text-img">
                <img src={profilePhoto} className="user-card-photo"/>
                <div className="user-card-text">
                    <BText text={username}/>
                    <BText text={name} color={DARK_GREY}/>
                </div>
            </div>
            <div className="user-card-switch">
                <BText text='Switch' color={PRIMARY_LIGHT}/>
            </div>
        </div>
    )
}

export default UserCard;