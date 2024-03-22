import React from "react";
import Sidebar from "../../components/core/Sidebar/Sidebar";
import MessagingOverview from "./MessagingOverview";

const MessagingOverviewWidget: React.FC = () => {
    return (
        <div>
            <Sidebar/>
            <MessagingOverview/>
        </div>
    )
}