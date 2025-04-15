import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import './InsertarContenidos.scss';
import { API_URL } from '../../api';

export const InsertarContenidos = ({ coleccionId, onExitoInsercion, contenidoAEditar, setContenidoAEditar }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (contenidoAEditar) {
      setTitulo(contenidoAEditar.titulo || "");
      setDescripcion(contenidoAEditar.descripcion || "");
      setUrl(contenidoAEditar.url || "");
      setImagen(null);
      setExpanded(true);
    } else {
      limpiarFormulario();
    }
  }, [contenidoAEditar]);

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setUrl("");
    setImagen(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
    setExpanded(false);
    setContenidoAEditar(null);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!coleccionId || isNaN(coleccionId)) {
      setError("El ID de la colección no es válido.");
      return;
    }

    const datosFormulario = new FormData();
    datosFormulario.append("coleccion_id", coleccionId);

    if (titulo !== (contenidoAEditar?.titulo || "") && titulo !== "") datosFormulario.append("titulo", titulo);
    if (url !== (contenidoAEditar?.url || "") && url !== "") datosFormulario.append("url", url);
    if (descripcion !== (contenidoAEditar?.descripcion || "") && descripcion !== "") datosFormulario.append("descripcion", descripcion);
    if (imagen) datosFormulario.append("imagen", imagen);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación");
      return;
    }

    try {
      let response;
      if (contenidoAEditar) {
        datosFormulario.append("_method", "PUT");
        response = await axios.post(
          `${API_URL}/contenidos/${contenidoAEditar.id}`,
          datosFormulario,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(`${API_URL}/contenidos`, datosFormulario, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onExitoInsercion(response.data.data);
      limpiarFormulario();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Hubo un error al guardar el contenido.");
      } else {
        setError("Hubo un error al guardar el contenido.");
      }
    }
  };

  return (
    <Accordion className="insertar-contenidos-wrapper" activeKey={expanded ? "0" : null}>
      <Accordion.Item eventKey="0">
        <Accordion.Header
          className="accordion-header-custom"
          onClick={() => setExpanded(!expanded)}
        >
          {contenidoAEditar ? "Editar Contenido" : "Insertar Contenido"}
        </Accordion.Header>
        <Accordion.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={manejarEnvio}>
            <Form.Group className="mb-3">
              <Form.Label>Título del contenido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el título..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enlace</Form.Label>
              <Form.Control
                type="url"
                placeholder="Pega la URL aquí..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe una descripción..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen (opcional)</Form.Label>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={(e) => setImagen(e.target.files[0])}
              />
              <br />
              {contenidoAEditar && contenidoAEditar.imagen && !imagen && (
                <div className="imagen-actual">
                  <p>Imagen actual:</p>
                  <img
                    src={`${API_URL.replace('/api', '')}${contenidoAEditar.imagen}`}
                    alt="Imagen actual"
                    style={{ maxWidth: "100px", display: "block", marginTop: "10px" }}
                  />
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button className="btn-primary me-2 boton-guardar-coleccion" type="submit">
                {contenidoAEditar ? "Actualizar" : "Añadir"}
              </Button>
              {contenidoAEditar && (
                <Button variant="secondary" onClick={limpiarFormulario}>
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