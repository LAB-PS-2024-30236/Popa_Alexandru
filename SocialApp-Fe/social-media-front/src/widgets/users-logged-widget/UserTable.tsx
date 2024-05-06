import React from "react";
import { UserLogged } from "./model/model/types";
import UserRow from "./UserRow";

const UserTable: React.FC<{ usersLogged: any, isDarkMode: any }> = ({usersLogged, isDarkMode}) => {
    return (
        <div className={`body1 ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>User Log</h1>
            <div className={`tbl-header ${isDarkMode ? 'dark-mode' : ''}`}>
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Time Logged</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className={`tbl-content ${isDarkMode ? 'dark-mode' : ''}`}>
                <table>
                    <tbody>
                    {usersLogged.map((userLogged: React.JSX.IntrinsicAttributes & UserLogged, index: React.Key | null | undefined) => (
                        <UserRow key={index} {...userLogged} isDarkMode={isDarkMode}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
