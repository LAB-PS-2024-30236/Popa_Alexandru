import React, {useEffect, useState} from "react";
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
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    useEffect(() => {
        dispatch(closeProfile());
        dataRequested({ jwtToken, dispatch });

        if (!isLogged) {
            navigate('/login');
            dispatch(closeSidebar());
        }
    }, [jwtToken]);

    const escapeXML = (str: string) => {
        // @ts-ignore
        return str.replace(/[<>&'"]/g, function (char) {
            switch (char) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case "'": return '&apos;';
                case '"': return '&quot;';
            }
        });
    };

    const exportXML = () => {
        let xmlString = `<users>
<totalNumber>${totalNumberOfLoggedUsers}</totalNumber>
<usersLogged>`;
        usersLogged.forEach(user => {
            xmlString += `
<user>
<profilePhoto>${escapeXML(user.profilePhoto)}</profilePhoto>
<username>${escapeXML(user.username)}</username>
<name>${escapeXML(user.name)}</name>
<timeWhenLogged>${escapeXML(user.timeWhenLogged)}</timeWhenLogged>
<userId>${user.userId}</userId>
</user>`;
        });
        xmlString += `
</usersLogged>
</users>`;

        const blob = new Blob([xmlString], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'logged-users.xml';
        link.click();
        URL.revokeObjectURL(link.href);
    };


    return (
        <div className={`widget-main-logged ${isDarkMode ? 'dark-mode' : ''}`}>
            <div>
                <h1>Total number of users currently logged in is : {totalNumberOfLoggedUsers}</h1>
                <UserTable usersLogged={usersLogged} isDarkMode={isDarkMode}/>
                <div className="export-to-xml">
                <button onClick={exportXML} type="button" className={`create-post-button btn btn-primary ${isDarkMode ? 'dark-mode' : ''}`}>Export Users to XML</button>
                </div>
            </div>
        </div>
    );
};

export default UsersLoggedWidget;
