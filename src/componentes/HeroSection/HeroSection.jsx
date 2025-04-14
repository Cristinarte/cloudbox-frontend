import React from 'react';
import './HeroSection.scss';
import mano from '../../assets/images/mano.png';
import puntero from '../../assets/images/puntero.png';

export const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Imagen superior */}
      <img
        src={puntero}
        className="hero-image top-right rounded mobile-stack"
        alt="Imagen superior derecha"
      />

      <div className="hero-text">
        <h1 className="hero-title">ORDENA</h1>
        <h1 className="hero-subtitle">TU CAOS</h1>
        <h1 className="hero-highlight">DIGITAL</h1>
      </div>

      {/* Imagen inferior */}
      <img
        src={mano}
        className="hero-image bottom-left rounded imagen-mano mobile-stack"
        alt="Imagen inferior izquierda"
      />
    </div>


  );
}
