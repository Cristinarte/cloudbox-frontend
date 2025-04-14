import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Contenidos } from '../Contenidos/Contenidos';
import './DashboardContenidos.scss';

export const DashboardContenidos = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="dashboard">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Contenidos />
    </div>
  );
};