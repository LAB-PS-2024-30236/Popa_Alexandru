import React from "react";
import LogoutButton from "./LogoutButton";
import ToggleDarkModeButton from "./ToggleDarkModeButton";

const SettingsOverviewWidget: React.FC = () => {
    return (
        <div className="settings-overview-widget">
        <ToggleDarkModeButton/>
        <LogoutButton/>
        </div>
    );
};

export default SettingsOverviewWidget;
