import React, { useState } from 'react';
import './Registro.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlechaBoton from '../Generales/FlechaBoton';
import relojArena from '../../assets/images/relojArena.png';

const endpoint = 'http://localhost:8000/api/register';

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const envioFormulario = async (e) => {
    e.preventDefault();
    if (!checked) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      await axios.post(endpoint, {
        nombre,
        alias,
        email,
        password,
        role_id: 1,
      });
      navigate('/');
    } catch (error) {
      console.log('Error', error.response?.data || error);
      setError(error.response?.data?.message || 'Error al registrar el usuario');
    }
  };

  return (
    <>
      <div className="d-flex-login justify-content-center align-items-center min-vh-100">
        <div className="registro-form-container-login">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-center m-0">REGISTRO</h3>
          </div>

          <form className="formulario" onSubmit={envioFormulario}>
            <div className="mb-3">
              <label htmlFor="exampleInputNombre1" className="form-label">
                Nombre completo<span className="error-asterisco">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNombre1"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAlias1" className="form-label">
                Alias<span className="error-asterisco">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAlias1"
                placeholder="Nombre de usuario"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>

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
              />
            </div>

            <div className="d-flex justify-content-end mb-4">
              <p><span className="error-asterisco">*</span>Indica un campo obligatorio</p>
            </div>

            <div className="mb-4 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Al marcar esta casilla, acepta los Términos, Privacidad y Reglas de CloudBox
              </label>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn-primary w-100">
              Registrarse
            </button>
          </form>
        </div>
        <div className="vectorRegistro">
          <img src={relojArena} className="rueda" alt="Imagen inferior izquierda" />
        </div>
      </div>
    </>
  );
};