import React, { useEffect, useState, useRef } from "react";
import { InsertarContenidos } from "./InsertarContenidos";
import { Compartir } from '../Generales/Compartir';
import axios from "axios";
import { FaEdit, FaTrash, FaShareAlt } from 'react-icons/fa';
import { ModalConfirmacion } from '../Generales/ModalConfirmacion';  // Importa el modal
import "./listadoContenidos.scss";
import { API_URL } from '../../api';

export const ListadoContenidos = ({ coleccionId, contenidos, terminoBusqueda }) => {
  const [contenidosLocal, setContenidosLocal] = useState(contenidos);
  const [error, setError] = useState("");
  const [contenidoAEditar, setContenidoAEditar] = useState(null);
  const [contenidoACompartir, setContenidoACompartir] = useState(null);
  const [nuevoContenidoInsertado, setNuevoContenidoInsertado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
  const [contenidoAEliminar, setContenidoAEliminar] = useState(null); // Estado para el contenido a eliminar
  const ultimoContenidoRef = useRef(null);

  useEffect(() => {
    setContenidosLocal(contenidos);
    console.log("Datos actualizados de contenidos:", contenidos);
  }, [contenidos]);

  const manejarEliminar = (id) => {
    setContenidoAEliminar(id); // Establecer el contenido que se va a eliminar
    setModalVisible(true); // Mostrar el modal de confirmación
  };

  const confirmarEliminar = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación");
      return;
    }
    try {
      await axios.delete(`${API_URL}/contenidos/${contenidoAEliminar}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContenidosLocal((prev) => prev.filter((contenido) => contenido.id !== contenidoAEliminar));
      setModalVisible(false); // Ocultar el modal después de la eliminación
      setContenidoAEliminar(null); // Limpiar el contenido a eliminar
    } catch (error) {
      setError("No se pudo eliminar el contenido");
      console.error("Error al eliminar contenido:", error);
    }
  };

  const manejarEdicion = (contenido) => {
    setContenidoAEditar(contenido);
  };

  const manejarCompartir = (contenido) => {
    setContenidoACompartir(contenido);
  };

  const manejarExitoInsercion = (nuevoContenido) => {
    if (contenidoAEditar) {
      setContenidosLocal((prev) =>
        prev.map((contenido) =>
          contenido.id === nuevoContenido.id ? nuevoContenido : contenido
        )
      );
    } else {
      setContenidosLocal((prev) => [...prev, nuevoContenido]);
      setNuevoContenidoInsertado(true);
    }
    setContenidoAEditar(null);
  };

  useEffect(() => {
    if (nuevoContenidoInsertado && ultimoContenidoRef.current) {
      ultimoContenidoRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setNuevoContenidoInsertado(false);
    }
  }, [nuevoContenidoInsertado, contenidosLocal]);

  const resaltarTexto = (texto, termino) => {
    if (!termino || termino.trim() === "") return texto.toUpperCase();
    const regex = new RegExp(`(${termino})`, "gi");
    return texto.toUpperCase().replace(regex, '<span class="resaltado">$1</span>');
  };

  return (
    <div className="contenidos-wrapper">
      {error && <p className="contenidos-error">{error}</p>}

      <InsertarContenidos
        coleccionId={coleccionId}
        onExitoInsercion={manejarExitoInsercion}
        contenidoAEditar={contenidoAEditar}
        setContenidoAEditar={setContenidoAEditar}
      />

      {contenidoACompartir && (
        <Compartir
        show={!!contenidoACompartir}
        onHide={() => setContenidoACompartir(null)}
        coleccion={contenidoACompartir}
        />
      )}

      {/* Mostrar el modal cuando modalVisible sea true */}
      {modalVisible && (
        <ModalConfirmacion
          mensaje={
            <>¿Estás seguro de que quiere <strong>eliminar</strong> este contenido? </>
          }
          onConfirmar={confirmarEliminar}
          onCancelar={() => setModalVisible(false)}
        />
      )}

      <div className="contenidos-list">
        {contenidosLocal.length > 0 ? (
          contenidosLocal.map((contenido, index) => (
            <div
              key={contenido.id}
              className="contenido-card"
              ref={index === contenidosLocal.length - 1 ? ultimoContenidoRef : null}
            >
              <div className="contenido-img-wrapper">
                <img
                  src={`${API_URL.replace('/api', '')}${contenido.imagen}`}
                  alt={contenido.titulo}
                  className="contenido-img"
                />
              </div>
              <div className="contenido-info">
                <h5
                  className="contenido-title"
                  dangerouslySetInnerHTML={{
                    __html: resaltarTexto(contenido.titulo, terminoBusqueda),
                  }}
                />
                <p className="contenido-description">
                  {contenido.descripcion
                    ? contenido.descripcion.charAt(0).toUpperCase() + contenido.descripcion.slice(1)
                    : "Descripción no disponible."}
                </p>
                <p className="contenido-url">
                  <a href={contenido.url} target="_blank" rel="noopener noreferrer">
                    {contenido.url}
                  </a>
                </p>

                <div className="contenido-buttons">
                  <FaShareAlt
                    onClick={() => manejarCompartir(contenido)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <FaEdit
                    onClick={(event) => {
                      event.stopPropagation();
                      manejarEdicion(contenido);
                    }}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <FaTrash
                    onClick={(event) => {
                      event.stopPropagation();
                      manejarEliminar(contenido.id);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="contenidos-no-data">No hay contenidos en esta colección.</p>
        )}
      </div>
    </div>
  );
};