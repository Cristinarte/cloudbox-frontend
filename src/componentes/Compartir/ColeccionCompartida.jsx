import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { API_URL } from '../../api';
import './ColeccionCompartida.scss';

export const ColeccionCompartida = ({ token, setToken, tokenUrl, showModal, setShowModal }) => {
  const [compartido, setCompartido] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerContenidoCompartido = async () => {
      try {
        setCargando(true);
        const res = await axios.get(`${API_URL}/api/compartido/${tokenUrl}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
          withCredentials: true,
        });
        console.log('Datos recibidos:', res.data); // Depuración
        setCompartido(res.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar el contenido compartido:', err.response?.data || err.message);
        setError('No se pudo cargar el contenido compartido');
      } finally {
        setCargando(false);
      }
    };

    if (tokenUrl && token) {
      obtenerContenidoCompartido();
    }
  }, [tokenUrl, token]);

  const handleCloseModal = () => {
    setShowModal(false);
    window.history.replaceState({}, '', '/dashboard');
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="coleccion-compartida-modal">
      <Modal.Header>
        <Modal.Title className="titulo-modal">
          Contenido compartido
          <span
            onClick={handleCloseModal}
            className="cerrar-modal"
          >
            ×
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cargando ? (
          <p className="text-center">Cargando contenido compartido...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : compartido && (
          <div className="compartido-container">
            {compartido.tipo === 'coleccion' ? (
              <>
                <div className="coleccion-header">
                  <small className="text-muted">
                    Compartido por: {compartido.compartido_por || 'Desconocido'}
                  </small>
                </div>
                <Card className="coleccion-card">
                  <h5 className="contenidos-titulo">Colección:</h5>
                  <div className="titulo-coleccion">
                    {compartido.coleccion?.imagen ? (
                      <div className="coleccion-imagen-container">
                        <img
                          src={`${API_URL}${compartido.coleccion.imagen}`}
                          alt={compartido.coleccion.nombre || 'Imagen de colección'}
                          className="coleccion-imagen"
                        />
                      </div>
                    ) : (
                      <p className="text-muted">No hay imagen disponible</p>
                    )}
                    <span className="coleccion-nombre">
                      {compartido.coleccion?.nombre || 'Colección sin nombre'}
                    </span>
                  </div>
                </Card>
                <h5 className="contenidos-titulo">Contenidos de esta colección:</h5>
                <ListGroup className="contenidos-list">
                  {compartido.contenidos && compartido.contenidos.length > 0 ? (
                    compartido.contenidos.map((contenido) => (
                      <ListGroup.Item key={contenido.id} className="contenido-item">
                        <div className="contenido-item-container">
                          {contenido.imagen ? (
                            <img
                              src={`${API_URL}${contenido.imagen}`}
                              alt={contenido.titulo || 'Imagen de contenido'}
                              className="contenido-imagen"
                            />
                          ) : (
                            <div className="contenido-imagen-placeholder">
                              Sin imagen
                            </div>
                          )}
                          <div className="contenido-info">
                            <h6>{contenido.titulo || 'Sin título'}</h6>
                            <p className="contenido-descripcion">
                              {contenido.descripcion || 'Sin descripción disponible'}
                            </p>
                            {contenido.url ? (
                              <a
                                href={contenido.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm contenido-enlace"
                              >
                                Ver enlace
                              </a>
                            ) : (
                              <p className="text-muted">Sin enlace disponible</p>
                            )}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p className="text-muted">No hay contenidos en esta colección.</p>
                  )}
                </ListGroup>
              </>
            ) : (
              <>
                <div className="coleccion-header">
                  <small className="text-muted">
                    Compartido por: {compartido.compartido_por || 'Desconocido'}
                  </small>
                  <br />
                  <small className="text-muted">
                    De la colección: {compartido.coleccion?.nombre || 'Sin colección'}
                  </small>
                </div>
                <h5 className="contenidos-titulo">Contenido:</h5>
                <Card className="contenido-card">
                  <div className="contenido-item-container">
                    {compartido.contenido?.imagen ? (
                      <img
                        src={`${API_URL}${compartido.contenido.imagen}`}
                        alt={compartido.contenido.titulo || 'Imagen de contenido'}
                        className="contenido-imagen"
                      />
                    ) : (
                      <div className="contenido-imagen-placeholder">
                        Sin imagen
                      </div>
                    )}
                    <div className="contenido-info">
                      <h6>{compartido.contenido?.titulo || 'Sin título'}</h6>
                      <p className="contenido-descripcion">
                        {compartido.contenido?.descripcion || 'Sin descripción disponible'}
                      </p>
                      {compartido.contenido?.url ? (
                        <a
                          href={compartido.contenido.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm contenido-enlace"
                        >
                          Ver enlace
                        </a>
                      ) : (
                        <p className="text-muted">Sin enlace disponible</p>
                      )}
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/*<Button variant="primary" onClick={handleCloseModal} className="btn-cerrar">
          Cerrar
        </Button>*/}
      </Modal.Footer>
    </Modal>
  );
};