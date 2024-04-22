import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {usersSelect} from "./model/model/selectors";
import {useNavigate} from "react-router-dom";
import {closeProfile} from "../profile-overview-widget/model/reducers";
import {dataRequested} from "./model/model/effects";
import {closeSidebar} from "../../redux/core/layout/reducers";
import {authSelect} from "../auth-login-widget/model/selectors";
import UserTable from "./UserTable";
import './UsersLoggedWidget.css'

const UsersLoggedWidget: React.FC = () => {
    const jwtToken = useSelector(sessionSelect.jwtToken);
    const totalNumberOfLoggedUsers = useSelector(usersSelect.totalNumberOfLoggedUsers);
    const usersLogged = useSelector(usersSelect.usersLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector(authSelect.isLogged);

    useEffect(() => {
        dispatch(closeProfile());
        dataRequested({jwtToken, dispatch})

        if (!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [jwtToken]);

    return (
        // @ts-ignore
        <div className="widget-main-logged">
            <div>
                <h1>Total number of users currently logged in is : {totalNumberOfLoggedUsers} </h1>
            <UserTable usersLogged={usersLogged}/>
            </div>
        </div>
    )
};

export default UsersLoggedWidget