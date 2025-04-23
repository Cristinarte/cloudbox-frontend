import React, { useState, useEffect } from "react";
import { Sidebar } from '../Sidebar/Sidebar';
import { Panel } from '../Panel/Panel';
import { ColeccionCompartida } from '../Compartir/ColeccionCompartida';
import { useParams, useNavigate } from 'react-router-dom';
import "./dashboard.scss";

export const Dashboard = ({ alias, token, setToken }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { token: tokenUrl } = useParams(); // Obtener token de la URL si existe
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(!!tokenUrl); // Mostrar modal si hay token

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Manejar redirección a login si no hay token
  useEffect(() => {
    if (!token && tokenUrl) {
      localStorage.setItem('tokenCompartidoPendiente', tokenUrl);
      navigate('/login');
    }
  }, [token, tokenUrl, navigate]);

  return (
    <div className="dashboard">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Panel usuario={alias} />
      {tokenUrl && (
        <ColeccionCompartida
          token={token}
          setToken={setToken}
          tokenUrl={tokenUrl}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};