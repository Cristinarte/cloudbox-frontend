// FlechaBoton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FlechaBoton.scss';

const FlechaBoton = ({ direccion, destino }) => {
  return (
    <div className="flecha-boton">
      {direccion === 'izquierda' && (
        <Link to={destino || '/pagina-anterior'}>
          <button className="boton-flecha">
            &lt; {/* Flecha hacia la izquierda */}
          </button>
        </Link>
      )}
      {direccion === 'derecha' && (
        <Link to={destino || '/pagina-siguiente'}>
          <button className="boton-flecha">
            &gt; {/* Flecha hacia la derecha */}
          </button>
        </Link>
      )}
    </div>
  );
};

export default FlechaBoton;
