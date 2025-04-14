import React, { useState } from "react";
import { Sidebar } from '../Sidebar/Sidebar';
import { Panel } from '../Panel/Panel';
import "./dashboard.scss";

export const Dashboard = ({ alias }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="dashboard">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Panel usuario={alias} />
    </div>
  );
};