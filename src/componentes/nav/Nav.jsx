import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './nav.scss';
import logo from "../../assets/images/logoWebV4.png";
import isologo from "../../assets/images/isologoWeb3.png";

export const Nav = ({ token, setToken }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [logoActual, setLogoActual] = useState(logo);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const confirmarCerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    setMenuAbierto(false);
    setMostrarModal(false);
  };

  // Cambiar logo en función del ancho de pantalla
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleResize = (e) => {
      if (e.matches) {
        setLogoActual(isologo);
      } else {
        setLogoActual(logo);
      }
    };

    // Establecer logo inicial
    if (mediaQuery.matches) {
      setLogoActual(isologo);
    }

    // Escuchar cambios
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const Modal = () => {
    if (!mostrarModal) return null;

    return ReactDOM.createPortal(
      <div className="modal-overlay">
        <div className="modal-contenido">
          <h5 className="modal-title">¿Cerrar sesión en tu cuenta?</h5>
          <div className="modal-body">
            <p>Tendrás que volver a iniciar sesión para acceder a tu espacio.</p>
          </div>
          <div className="modal-botones">
            <button type="button" className="btn-cancelar" onClick={cerrarModal}>
              Cancelar
            </button>
            <button type="button" className="btn-confirmar" onClick={confirmarCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid nav">
          <span className="navbar-brand">
            <img src={logoActual} alt="CloudBox Logo" className="logo-navbar" />
          </span>

          <button className="hamburger d-md-none" onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </button>

          <div className="d-none d-md-flex align-items-center">
            {token ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link to="/profile" className="dropdown-item">Perfil</Link></li>
                  <li>
                    <button className="dropdown-item" onClick={abrirModal}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <form className="d-flex" role="search">
                <button className="btn-outline-primary me-3" type="button">
                  <Link to="/login" className="text-decoration-none">Iniciar sesión</Link>
                </button>
                <button className="btn-primary" type="button">
                  <Link to="/register" className="text-white text-decoration-none">Registrarse</Link>
                </button>
              </form>
            )}
          </div>
        </div>

        {menuAbierto && (
          <div className="menu-movil">
            <button className="cerrar-menu" onClick={toggleMenu}>
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="menu-opciones">
              {token ? (
                <>
                  <Link to="/profile" onClick={toggleMenu}>Perfil</Link>
                  <button onClick={abrirModal}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMenu}>Iniciar sesión</Link>
                  <Link to="/register" onClick={toggleMenu}>Registrarse</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <Modal />
    </>
  );
};