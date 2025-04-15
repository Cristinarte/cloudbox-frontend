import React, { useState } from 'react';
import axios from 'axios';
import './Inicio.scss'; // Puedes reutilizar los estilos del login si quieres
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../api';


export const RecuperarContrasenia = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
  
      navigate('/email-enviado'); // 👈 Redirige directamente
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud');
      setMensaje('');
    }
  };



  return (
    <div className="d-flex-login justify-content-center align-items-center min-vh-100">
      <div className="registro-form-container-login">
        <form className="formulario" onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico<span className="error-asterisco">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-texto">{error}</p>}
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}

          <button type="submit" className="btn-primary w-100">
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  );
};