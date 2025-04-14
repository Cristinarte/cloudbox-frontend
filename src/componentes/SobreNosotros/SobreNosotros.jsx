import React from 'react';
import './SobreNosotros.scss';
import imagenInicio from '../../assets/images/vectorEscribir.png';
import imagenFinal from '../../assets/images/vectorEscribir.png';
import manualMarca from '../../assets/docs/ManualIdentidadCloudbox.pdf';

export const SobreNosotros = () => {
  return (
    <div className="container-general">
      {/* Div negro con título y dos imágenes */}
      <div className="container-titulo d-flex align-items-center justify-content-center">
        <img src={imagenInicio} alt="Inicio" className="imagen-titulo" />
        <h1 className="text-center mb-0 titulo-principal">
          DETRÁS DE CADA <span>CONEXIÓN,</span> NOSOTROS
        </h1>
        <img src={imagenFinal} alt="Final" className="imagen-titulo" />
      </div>

      {/* Contenido centrado */}
      <div className="container my-5">
        <div className="d-flex flex-column justify-content-center align-items-center text-center mx-auto sobre-nosotros-contenido" style={{ minHeight: '400px', maxWidth: '700px' }}>
          <h3 className="titulo-principal">TODO EN SU SITIO, TODO CONECTADO</h3>
          <div className="texto-principal mb-4">
            <p>
              Vivimos en un mundo digital donde accedemos constantemente a información: tutoriales, artículos, documentos, herramientas, plataformas educativas... Y, sin darnos cuenta, terminamos perdiendo lo que realmente importa. Por eso, un día nos preguntamos: ¿y si pudiéramos organizarlo todo de forma simple, intuitiva y eficiente?
            </p>
            <p>
              Así nació CLOUDBOX, un equipo joven y apasionado que cree en la innovación constante, el aprendizaje continuo y en crear soluciones que realmente marquen la diferencia. Queremos ofrecer una experiencia donde cada recurso digital tenga su espacio, donde todo esté al alcance, sin caos, sin pérdidas.
            </p>
            <p>
              Este es nuestro propósito. Esto es lo que nos impulsa. Y aquí es donde empieza todo.
            </p>
          </div>
          <h5>
            <a href={manualMarca} className="enlace-manual" target="_blank" rel="noopener noreferrer">
              Ver nuestro manual de marca
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};