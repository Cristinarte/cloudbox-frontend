import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Desplaza el scroll al inicio
  };

  return (
    <>
      <footer className="bg-dark text-light py-4">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-4">
              <Link to="/sobre-nosotros" className="sobre-nosotros" onClick={handleLinkClick}>
                <h5>Sobre Nosotros</h5>
              </Link>
            </div>

            <div className="col-md-4 text-md-end">
              <h5>Síguenos</h5>
              <a href="#" className="text-light me-2"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-2"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
          <hr className="my-3" />
          <p className="text-center mb-0">© 2025 Cloudbox. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};