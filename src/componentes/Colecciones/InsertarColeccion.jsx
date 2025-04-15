import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Form, Button } from 'react-bootstrap';
import './InsertarColeccion.scss';
import { API_URL } from '../../api';

export const InsertarColeccion = ({ onInsertSuccess, coleccionEditar, setColeccionEditar }) => {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (coleccionEditar) {
      setNombre(coleccionEditar.nombre);
      setImagen(null);
      setExpanded(true);
    } else {
      setNombre('');
      setImagen(null);
      setExpanded(false);
    }
  }, [coleccionEditar]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const datosFormulario = new FormData();
    datosFormulario.append('nombre', nombre);
    if (imagen) {
      datosFormulario.append('imagen', imagen);
    }

    try {
      const token = localStorage.getItem('token');
      let respuesta;

      if (coleccionEditar) {
        // Modo edición: POST con spoofing PUT
        datosFormulario.append('_method', 'PUT');
        respuesta = await axios.post(
          `${API_URL}/colecciones/${coleccionEditar.id}`,
          datosFormulario,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // Modo inserción: POST
        respuesta = await axios.post(`${API_URL}/colecciones`, datosFormulario, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('Respuesta de la API:', respuesta.data); // Depuración
      setNombre('');
      setImagen(null);
      setError(null);
      setExpanded(false);
      setColeccionEditar(null);
      onInsertSuccess(respuesta.data.data); // Pasamos la colección actualizada desde data.data
    } catch (error) {
      console.error('Error al guardar la colección:', error.response?.data);
      setError('Hubo un error al guardar la colección. Inténtalo de nuevo.');
    }
  };

  return (
    <Accordion className="insertar-colecciones-wrapper" activeKey={expanded ? '0' : ''}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordion-header-custom" onClick={() => setExpanded(!expanded)}>
          {coleccionEditar ? 'Editar Colección' : 'Añadir Colección'}
        </Accordion.Header>
        <Accordion.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={manejarEnvio}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                maxLength="24"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                *Máximo 24 caracteres
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Imagen (opcional)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
                accept="image/*"
              />
              <br />
              {coleccionEditar && !imagen && (
                <div className="imagen-actual">
                  <Form.Label>Imagen actual:</Form.Label>
                  <img
                    src={`${API_URL.replace('/api', '')}${coleccionEditar.imagen}`}
                    alt="Imagen actual"
                    style={{ maxWidth: "100px", display: "block", marginTop: "10px" }} // Añadido display: block
                  />
                </div>
              )}
            </Form.Group>



            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {coleccionEditar ? 'Actualizar' : 'Guardar Colección'}
              </Button>
              {coleccionEditar && (
                <Button
                  variant="secondary"
                  className="ms-2 boton-guardar-coleccion"
                  onClick={() => {
                    setColeccionEditar(null);
                    setNombre('');
                    setImagen(null);
                    setExpanded(false);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>


          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};