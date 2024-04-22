import React from "react";
import { UserLogged } from "./model/model/types";
import './UsersLoggedWidget.css'

const UserRow: React.FC<UserLogged> = ({ profilePhoto, username, name, timeWhenLogged }) => {
    return (
        <tr>
            <td>
                <div className='table-row'><img src={profilePhoto} alt={username} style={{width: "50px", height: "50px"}}/>
                    <p>{username}</p>
                </div>
            </td>
            <td>{name}</td>
            <td>{new Date(timeWhenLogged).toLocaleString()}</td>
        </tr>
    );
};

export default UserRow;
