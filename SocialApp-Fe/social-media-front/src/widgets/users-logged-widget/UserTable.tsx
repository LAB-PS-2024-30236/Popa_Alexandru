import React from "react";
import UserRow from "./UserRow";
import { UserLogged } from "./model/model/types";
import './UsersLoggedWidget.css'; // Make sure to import the CSS file

interface UsersLogged {
    usersLogged: UserLogged[];
}

const UserTable: React.FC<UsersLogged> = ({ usersLogged }) => {
    return (
        <div className='body1'>
            <h1>User Log</h1>
            <div className="tbl-header">
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
            <div className="tbl-content">
                <table>
                    <tbody>
                    {usersLogged.map((userLogged, index) => (
                        <UserRow key={index} {...userLogged} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
