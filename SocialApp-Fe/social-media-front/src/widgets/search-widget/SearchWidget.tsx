import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataRequested } from "./model/effects";
import { searchSelect } from "./model/selectors";
import './SearchWidget.css';
import {setCurrentProfile} from "../profile-overview-widget/model/reducers";
import {useNavigate} from "react-router-dom";

const SearchWidget: React.FC = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const searchResult = useSelector(searchSelect.searchResult);
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (username) {
            dataRequested({ username, dispatch });
        }
    }, [username, dispatch]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="search-container">
            <input
                className="description-input-search"
                type="text"
                value={username}
                placeholder="Search by username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="search-results">
                {searchResult.length > 0 ? (
                    searchResult.map(user => (
                        <div key={user.userId} className="search-result-item">
                            <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`}
                                 onClick={() => {
                                     dispatch(setCurrentProfile(user.userId));
                                     navigate('/profile');}}/>
                            <div className="user-info"
                                 onClick={() => {
                                     dispatch(setCurrentProfile(user.userId));
                                     navigate('/profile');}}>
                                <h4>{`${user.firstName} ${user.lastName}`}</h4>
                                <p>{user.username}</p>
                                <p>{user.description || 'No bio available.'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        No users found for the search criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchWidget;
