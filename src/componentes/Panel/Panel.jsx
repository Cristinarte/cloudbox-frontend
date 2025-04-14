import React from "react";
import "./panel.scss";
import compartir from '../../assets/images/iconoCompartir.png';

export const Panel = ({ usuario, toggleSidebar }) => {
  return (
    <div className="panel">
      <div className="contenido-centrado">
        <img src={compartir} className="icono-compartir top-right" alt="Imagen superior derecha" />
        <div className="hero-text">
          <h1 className="hero-title">ESPACIO DE</h1>
          <h1 className="hero-highlight">{usuario.toUpperCase()}</h1>
        </div>
        <img src={compartir} className="icono-compartir bottom-left" alt="Imagen inferior izquierda" />
      </div>
    </div>
  );
};