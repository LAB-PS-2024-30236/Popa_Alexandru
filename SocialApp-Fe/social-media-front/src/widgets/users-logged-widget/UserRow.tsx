import React from "react";

const UserRow: React.FC<{ profilePhoto: any, username: any, name: any, timeWhenLogged: any, isDarkMode: any }> = ({ profilePhoto, username, name, timeWhenLogged, isDarkMode }) => {
    return (
        <tr className={isDarkMode ? 'dark-mode' : ''}>
            <td>
                <div className='table-row'>
                    <img src={profilePhoto} alt={username} style={{ width: "50px", height: "50px" }}/>
                    <p>{username}</p>
                </div>
            </td>
            <td>{name}</td>
            <td>{new Date(timeWhenLogged).toLocaleString()}</td>
        </tr>
    );
};

export default UserRow;
