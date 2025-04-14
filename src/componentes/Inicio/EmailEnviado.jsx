import React from 'react';
import './inicio.scss'; // Puedes usar los mismos estilos



export const EmailEnviado = () => {
  return (
    <div className="d-flex-login justify-content-center align-items-center min-vh-100">
      <div className="registro-form-container-login">
        <div className="formulario text-center">
          <p>
            Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.
            Por favor, <span style={{ color: '#252DD0' }}>revisa tu bandeja de entrada.</span>
          </p>
        </div>
      </div>
    </div>
  );
};