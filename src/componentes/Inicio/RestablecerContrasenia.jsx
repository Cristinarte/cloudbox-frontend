import React, { useState } from 'react';
import axios from 'axios';
import './Inicio.scss'; // Puedes reutilizar los estilos del login si quieres
import { useNavigate, useLocation } from 'react-router-dom';

export const RestablecerContrasenia = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Obtener parámetros de la URL

  // Extraer token y email de la URL
  const urlParams = new URLSearchParams(location.search);
  const token = location.pathname.split('/')[2]; // Token en el path
  const email = urlParams.get('email'); // Email como parámetro de consulta

  // Manejar el envío del formulario de restablecimiento de contraseña
  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      // Hacer la solicitud para restablecer la contraseña
      await axios.post('http://localhost:8000/api/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirm,
      });

      // Mostrar mensaje de éxito y redirigir
      setMensaje('Contraseña restablecida correctamente');
      setTimeout(() => {
        navigate('/login'); // Redirigir al login
      }, 2000);
    } catch (err) {
      // Manejar errores
      setError(err.response?.data?.error || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="d-flex-login justify-content-center align-items-center min-vh-100">
      <div className="registro-form-container-login">
        <form className="formulario" onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Introduce nueva contraseña<span className="error-asterisco">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirmar nueva contraseña<span className="error-asterisco">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              placeholder="Confirmar nueva contraseña"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-texto">{error}</p>}
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}

          <button type="submit" className="btn-primary w-100">
            Establecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
};