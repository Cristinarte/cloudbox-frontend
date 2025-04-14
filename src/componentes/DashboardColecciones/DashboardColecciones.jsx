import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Colecciones } from "../Colecciones/Colecciones";
import "./dashboardColecciones.scss";

export const DashboardColecciones = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`dashboard ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Colecciones />
    </div>
  );
};