import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/core/Button/Button';
import {logoutUser} from '../auth-login-widget/model/effects';
import "./SettingsMainWidget.css";
import {sessionSelect} from "../../redux/core/session/selectors";


const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector(sessionSelect.userId);


    const handleLogout = () => {
        logoutUser({userId, dispatch}).then(() => {
            window.location.assign('/login');
        });
    };

    return (
        <div className="log-out-container">
            <Button content="Log Out" onClick={handleLogout}/>
        </div>
    );
};

export default LogoutButton;
