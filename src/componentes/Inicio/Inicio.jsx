import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inicio.scss';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rueda from '../../assets/images/rueda3.png';
import { API_URL } from '../../api';

export const Inicio = ({ setToken, setAlias }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  // Login con email/contraseña
  const envioFormulario = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { token, alias } = respuesta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('alias', alias);
      setToken(token);
      setAlias(alias);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  // Login con Google
  const handleGoogleLogin = async (credentialResponse) => {
    console.log('Token de Google:', credentialResponse.credential);
    try {
      const respuesta = await axios.post(`${API_URL}/google-login`, {
        token: credentialResponse.credential,
      });
      const { token, alias } = respuesta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('alias', alias);
      setToken(token);
      setAlias(alias);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en Google Login:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Error al iniciar sesión con Google');
    }
  };

  console.log('VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="d-flex-login justify-content-center align-items-center min-vh-100">
        <div className="registro-form-container-login">
          <h3 className="text-center mb-4">INICIAR SESIÓN</h3>

          <form className="formulario" onSubmit={envioFormulario}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Correo electrónico<span className="error-asterisco">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña<span className="error-asterisco">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-end">
              <p><span className="error-asterisco">*</span>Indica un campo obligatorio</p>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="form-check text-center texto-aviso">
              <p>
                <Link to="/recuperar-contrasenia">¿Olvidaste tu contraseña?</Link>
              </p>
            </div>
            <button type="submit" className="btn-primary w-100">
              Acceder
            </button>

            <div className="btn-google w-100 mt-3">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.error('Error en Google Login');
                  setError('Error al iniciar sesión con Google');
                }}
              />
            </div>

            <div className="form-check text-center texto-aviso">
              <p>
                ¿Aún no estás en CloudBox? <Link to="/register">Regístrate</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="vectorLogin">
          <img src={rueda} className="rueda" alt="Imagen inferior izquierda" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};