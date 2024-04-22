import React from 'react';
import "./SimpleModal.css";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../../redux/core/session/selectors";
import {setCurrentProfile} from "../../../widgets/profile-overview-widget/model/reducers";
import {useNavigate} from "react-router-dom";

interface SimpleModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handlePrev: () => void;
    handleNext: () => void;
    username: string;
    profilePicture: string;
    userId:string;
    children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
                                                     isOpen,userId, handleClose, handlePrev, handleNext, username,
                                                     profilePicture, children
                                                 }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header"
                     onClick={() => {
                         dispatch(setCurrentProfile(userId));
                         navigate('/profile');}}>
                    <img src={profilePicture} alt={username} className="modal-profile-picture"/>
                    <span className="modal-username">{username}</span>
                </div>
                {children}
                <button className="modal-nav-button-story prev" onClick={handlePrev}></button>
                <button className="modal-nav-button-story next" onClick={handleNext}></button>
            </div>
        </div>
    );
};

export default SimpleModal;
