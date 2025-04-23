import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import './ListadoColecciones.scss';
import defaultImage from '../../assets/images/defaultImg.png';
import { Compartir } from '../Compartir/Compartir';
import { API_URL } from '../../api';

export const ListadoColecciones = ({ colecciones, onEditar, onEliminar, terminoBusqueda }) => {
  const [modalShow, setModalShow] = useState(false);
  const [coleccionActual, setColeccionActual] = useState(null);

  const resaltarTexto = (texto, termino) => {
    if (!termino || termino.trim() === '') return texto.toUpperCase();
    const regex = new RegExp(`(${termino})`, 'gi');
    return texto.toUpperCase().replace(regex, '<span class="resaltado">$1</span>');
  };

  const abrirModal = (coleccion) => {
    setColeccionActual(coleccion);
    setModalShow(true);
  };

  const cerrarModal = () => {
    setModalShow(false);
    setColeccionActual(null);
  };

  return (
    <div className="colecciones-container mt-6">
      {colecciones.length === 0 ? (
        <p className="text-center">No tienes colecciones aún.</p>
      ) : (
        <div className="colecciones-flex">
          {colecciones.map((coleccion) => (
            <Card className="coleccion-card" key={coleccion.id}>
              <Link to={`/contenidos/${coleccion.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <Card.Img
                  variant="top"
                  src={coleccion.imagen ? `${API_URL.replace('/api', '')}${coleccion.imagen}` : defaultImage}
                  alt={`Imagen de la colección ${coleccion.nombre}`}
                />
                <Card.Body>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: resaltarTexto(coleccion.nombre, terminoBusqueda),
                    }}
                  />
                </Card.Body>
              </Link>

              <div className="acciones">
                <FaShareAlt
                  onClick={() => abrirModal(coleccion)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                
                <FaEdit
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditar(coleccion.id);
                  }}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                
                <FaTrash
                  onClick={(event) => {
                    event.stopPropagation();
                    onEliminar(coleccion.id);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Componente Compartir */}
      <Compartir
        show={modalShow}
        onHide={cerrarModal}
        coleccion={coleccionActual}
      />
    </div>
  );
};
