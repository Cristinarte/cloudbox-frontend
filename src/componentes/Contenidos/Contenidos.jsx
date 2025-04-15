import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BusquedaFiltro } from "../BusquedaFiltro/BusquedaFiltro";
import { ListadoContenidos } from "./ListadoContenidos";
import "./Contenidos.scss";
import { API_URL } from '../../api';

export const Contenidos = () => {
  const { coleccionId } = useParams();
  const [coleccionNombre, setColeccionNombre] = useState("");
  const [contenidos, setContenidos] = useState([]);
  const [contenidosFiltrados, setContenidosFiltrados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [error, setError] = useState("");

  const fetchColeccionNombre = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación");
      return;
    }

    try {
      const respuesta = await axios.get(`${API_URL}/colecciones/${coleccionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setColeccionNombre(respuesta.data.nombre);
    } catch (error) {
      setError("No se pudo cargar el nombre de la colección");
      console.error("Error al cargar la colección:", error);
    }
  };

  const obtenerContenidos = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación");
      return;
    }
    try {
      const respuesta = await axios.get(`${API_URL}/contenidos`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { coleccion_id: coleccionId },
      });
      console.log("Datos de la API:", respuesta.data);
      setContenidos(respuesta.data);
      setContenidosFiltrados(respuesta.data); // Inicialmente, sin filtro
    } catch (error) {
      setError("No se pueden cargar los contenidos");
      console.error("Error al cargar contenidos:", error);
    }
  };

  const manejarOrden = (tipoOrden) => {
    if (tipoOrden === "A-Z") {
      const contenidosOrdenados = [...contenidosFiltrados].sort((a, b) =>
        a.titulo.localeCompare(b.titulo)
      );
      setContenidosFiltrados(contenidosOrdenados);
    }
  };

  const manejarBusqueda = (termino) => {
    setTerminoBusqueda(termino);
    if (termino.trim() === "") {
      setContenidosFiltrados(contenidos); // Si no hay búsqueda, mostramos todos
    } else {
      const filtrados = contenidos.filter((contenido) =>
        contenido.titulo.toLowerCase().includes(termino.toLowerCase())
      );
      setContenidosFiltrados(filtrados);
    }
  };

  useEffect(() => {
    fetchColeccionNombre();
    obtenerContenidos();
  }, [coleccionId]);

  return (
    <div className="colecciones">
      <h2 className="mis-colecciones">
        {error ? "Error al cargar" : coleccionNombre.toUpperCase() || "Cargando..."}
      </h2>
      <BusquedaFiltro onOrdenar={manejarOrden} onBuscar={manejarBusqueda} />
      {error && <p className="text-danger">{error}</p>}
      <ListadoContenidos
        coleccionId={coleccionId}
        contenidos={contenidosFiltrados}
        terminoBusqueda={terminoBusqueda} // Pasamos el término para resaltar
      />
    </div>
  );
};