import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

export const Sidebar = ({ isExpanded, toggleSidebar }) => {
  return (
    <div
      className={`sidebar d-flex flex-column p-3 text-white bg-primary vh-100 ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        <h4 className="flex-grow-1 titulo-panel">
          <Link to="/dashboard" className="text-white text-decoration-none ">
            PANEL DE CONTROL
          </Link>
        </h4>
        <i
          className={`bi ${isExpanded ? "bi-arrow-bar-left" : "bi-arrow-bar-right"} contraer-sidebar`}
          onClick={toggleSidebar}
          style={{ cursor: "pointer", fontSize: "24px" }}
        ></i>
      </div>
      <ul className="nav flex-column sidebar-content">
        <li className="nav-item">
          <a href="#" className="nav-link text-white d-flex align-items-center">
            <i className="fa fa-calendar me-2"></i> 
            <span className="menu-sidebar">Agenda</span>
          </a>
        </li>
        <li className="nav-item">
          <Link
            to="/colecciones"
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="fa fa-folder me-2"></i> 
            <span className="menu-sidebar">Colecciones</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};