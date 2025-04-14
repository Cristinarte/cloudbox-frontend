import React from "react";
import "./modalConfirmacion.scss";

export const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <p>{mensaje}</p>
        <div className="modal-botones">
          <button onClick={onCancelar} className="btn-cancelar">Cancelar</button>
          <button onClick={onConfirmar} className="btn-confirmar">Eliminar</button>
        </div>
      </div>
    </div>
  );
};