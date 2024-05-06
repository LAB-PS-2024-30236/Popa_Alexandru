import React, { useState, useEffect } from 'react';
import Button from '../../components/core/Button/Button';
import "./SettingsMainWidget.css";
import {useNavigate} from "react-router-dom";

const ToggleDarkModeButton: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const darkModeSetting = localStorage.getItem('hasDarkMode') === 'true';
        setIsDarkMode(darkModeSetting);
    }, []);

    const handleToggleDarkMode = () => {
        const newDarkModeSetting = !isDarkMode;
        localStorage.setItem('hasDarkMode', String(newDarkModeSetting));
        navigate('/home');
        window.location.reload();
        setIsDarkMode(newDarkModeSetting);
    };

    return (
        <div className="log-out-container">
            <Button
                content={isDarkMode ? "Change to white mode" : "Change to dark mode"}
                onClick={handleToggleDarkMode}
            />
        </div>
    );
};

export default ToggleDarkModeButton;
