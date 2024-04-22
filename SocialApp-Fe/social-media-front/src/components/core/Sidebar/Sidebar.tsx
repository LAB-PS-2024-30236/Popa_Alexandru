import React from "react";
import {Link, useLocation} from "react-router-dom";
import './styles.css';
import Home1 from '../../../assets/icons/house.svg';
import Home2 from '../../../assets/icons/houseFill.svg';
import Search from '../../../assets/icons/search.svg';
import Message1 from '../../../assets/icons/send.svg';
import Message2 from '../../../assets/icons/sendFill.svg';
import Notification1 from '../../../assets/icons/bell.svg';
import Notification2 from '../../../assets/icons/bellFill.svg';
import Plus1 from '../../../assets/icons/plus.svg';
import Plus2 from '../../../assets/icons/plusFill.svg';
import Users from '../../../assets/icons/grid.svg'
import User1 from '../../../assets/icons/user.svg';
import User2 from '../../../assets/icons/userFill.svg';
import Settings1 from '../../../assets/icons/settings.svg';
import Settings2 from '../../../assets/icons/settingsFilled.svg';
import {useSelector} from "react-redux";
import {sessionSelect} from "../../../redux/core/session/selectors";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const payload = jwtToken.split('.')[1];
    const decodedPayload = JSON.parse(window.atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const isAdmin = decodedPayload.aud === 'admin';

    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <p className="sidebar-logo">yolo</p>
                <div className="sidebar-options"><>
                    <Link to="/home" className={location.pathname !== "/home" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                        <img src={location.pathname !== "/home" ? Home1 : Home2} className="sidebar-icon"/>
                        <p className={location.pathname !== "/home" ? "sidebar-option-text" : "sidebar-text-active"}>Home</p>
                    </Link>
                    <Link to="/search" className={location.pathname !== "/search" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                        <img src={location.pathname !== "/search" ? Search : Search} className="sidebar-icon"/>
                        <p className={location.pathname !== "/search" ? "sidebar-option-text" : "sidebar-text-active"}>Search</p></Link>
                    <Link to="/messages" className={location.pathname !== "/messages" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                        <img src={location.pathname !== "/messages" ? Message1 : Message2} className="sidebar-icon"/>
                        <p className={location.pathname !== "/messages" ? "sidebar-option-text" : "sidebar-text-active"}>Messages</p>
                    </Link>
                    <Link to="/notifications" className={location.pathname !== "/notifications" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                        <img src={location.pathname !== "/notifications" ? Notification1 : Notification2} className="sidebar-icon"/>
                        <p className={location.pathname !== "/notifications" ? "sidebar-option-text" : "sidebar-text-active"}>Notifications</p>
                    </Link>
                    <Link to="/create" className={location.pathname !== "/create" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                        <img src={location.pathname !== "/create" ? Plus1 : Plus2} className="sidebar-icon"/>
                        <p className={location.pathname !== "/create" ? "sidebar-option-text" : "sidebar-text-active"}>Create</p>
                    </Link>
                    {console.log(isAdmin)}
                    {isAdmin ?  (
                        <Link to="/users" className={location.pathname !== "/users" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                            <img src={Users} className="sidebar-icon"/>
                            <p className={location.pathname !== "/users" ? "sidebar-option-text" : "sidebar-text-active"}>Logged Users</p>
                        </Link>
                    ): null}</>
                </div>
            </div>

            <div className="sidebar-options">
                <Link to="/profile" className={location.pathname !== "/profile" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                    <img src={location.pathname !== "/profile" ? User1 : User2} className="sidebar-icon"/>
                    <p className={location.pathname !== "/profile" ? "sidebar-option-text" : "sidebar-option-text sidebar-text-active"}>Profile</p>
                </Link>
                <Link to="/settings" className={location.pathname !== "/settings" ? "sidebar-option" : "sidebar-option sidebar-active"}>
                    <img src={location.pathname !== "/settings" ? Settings1 : Settings2} className="sidebar-icon"/>
                    <p className={location.pathname !== "/settings" ? "sidebar-option-text" : "sidebar-option-text sidebar-text-active"}>Settings</p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;