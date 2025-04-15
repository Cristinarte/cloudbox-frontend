import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ListadoColecciones } from './ListadoColecciones';
import { BusquedaFiltro } from '../BusquedaFiltro/BusquedaFiltro';
import { InsertarColeccion } from './InsertarColeccion';
import './Colecciones.scss';
import { ModalConfirmacion } from '../Generales/ModalConfirmacion';
import { API_URL } from '../../api';



export const Colecciones = () => {
  // Estados locales
  const [colecciones, setColecciones] = useState([]); 
  const [coleccionesFiltradas, setColeccionesFiltradas] = useState([]); 
  const [coleccionEditar, setColeccionEditar] = useState(null); 
  const [terminoBusqueda, setTerminoBusqueda] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [mostrarModal, setMostrarModal] = useState(false); 
  const [coleccionAEliminar, setColeccionAEliminar] = useState(null);

  const navigate = useNavigate();

  // Función para obtener las colecciones desde la API
  const obtenerColecciones = async () => {
    const token = localStorage.getItem('token'); // Obtener token de autenticación
    if (!token) {
      console.error('Usuario no autenticado. Redirigiendo a login.');
      navigate('/login');
      return;
    }

    try {
      const respuesta = await axios.get(`${API_URL}/colecciones`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      setColecciones(respuesta.data);
      setColeccionesFiltradas(respuesta.data); // Inicialmente sin filtro
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Token inválido. Redirigiendo a login...');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Error al obtener las colecciones:', error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para ordenar las colecciones
  const ordenarColecciones = (tipoOrden) => {
    let coleccionesOrdenadas = [...coleccionesFiltradas];
    if (tipoOrden === 'A-Z') {
      coleccionesOrdenadas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    setColeccionesFiltradas(coleccionesOrdenadas);
  };

  // Función para manejar la búsqueda de colecciones
  const manejarBusqueda = (termino) => {
    setTerminoBusqueda(termino);
    if (termino.trim() === '') {
      setColeccionesFiltradas(colecciones); // Mostrar todas si no hay búsqueda
    } else {
      const filtradas = colecciones.filter((coleccion) =>
        coleccion.nombre.toLowerCase().includes(termino.toLowerCase())
      );
      setColeccionesFiltradas(filtradas);
    }
  };

  // Función para iniciar la eliminación de una colección
  const handleEliminar = (id) => {
    const coleccion = colecciones.find((c) => c.id === id);
    setColeccionAEliminar(coleccion);
    setMostrarModal(true); // Mostrar el modal de confirmación
  };
  
  // Función para confirmar la eliminación
  const confirmarEliminacion = async () => {
    try {
      const id = coleccionAEliminar.id;
      const respuesta = await axios.delete(`${API_URL}/colecciones/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (respuesta.status === 200) {
        // Actualizar la lista de colecciones después de eliminar
        const nuevas = colecciones.filter((c) => c.id !== id);
        setColecciones(nuevas);
        setColeccionesFiltradas(nuevas);
        console.log('Colección eliminada correctamente');
      } else {
        console.error('No se pudo eliminar la colección.');
      }
    } catch (error) {
      console.error('Error al eliminar la colección:', error);
    } finally {
      setMostrarModal(false); // Cerrar modal
      setColeccionAEliminar(null); // Limpiar estado de colección a eliminar
    }
  };
  
  // Función para cancelar la eliminación
  const cancelarEliminacion = () => {
    setMostrarModal(false); // Cerrar modal
    setColeccionAEliminar(null); // Limpiar estado de colección a eliminar
  };

  // Función para manejar la edición de una colección
  const handleEditar = (id) => {
    const coleccion = colecciones.find((coleccion) => coleccion.id === id);
    setColeccionEditar(coleccion);
  };

  // Función para manejar el éxito de la inserción o actualización de una colección
  const handleInsertSuccess = (coleccionActualizada) => {
    if (coleccionEditar) {
      const nuevasColecciones = colecciones.map((coleccion) =>
        coleccion.id === coleccionActualizada.id ? coleccionActualizada : coleccion
      );
      setColecciones(nuevasColecciones);
      setColeccionesFiltradas(nuevasColecciones);
      setColeccionEditar(null);
    } else {
      setColecciones((prev) => [...prev, coleccionActualizada]);
      setColeccionesFiltradas((prev) => [...prev, coleccionActualizada]);
    }
  };

  // Hook useEffect para obtener las colecciones al cargar el componente
  useEffect(() => {
    obtenerColecciones();
  }, [navigate]);

  // Mostrar cargando mientras se obtienen los datos
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="colecciones">
      <h2 className="mis-colecciones mb-4">MIS COLECCIONES</h2>
      <BusquedaFiltro onOrdenar={ordenarColecciones} onBuscar={manejarBusqueda} />
      <InsertarColeccion
        onInsertSuccess={handleInsertSuccess}
        coleccionEditar={coleccionEditar}
        setColeccionEditar={setColeccionEditar}
      />
      <ListadoColecciones
        colecciones={coleccionesFiltradas}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        terminoBusqueda={terminoBusqueda} // Pasamos el término para resaltar
      />

      {/* Mostrar el ModalConfirmacion solo si 'mostrarModal' es true */}
      {mostrarModal && (
        <ModalConfirmacion
          mensaje={
            <>¿Seguro que deseas <strong>eliminar</strong> la colección "{coleccionAEliminar?.nombre}"?</>
          }
          onConfirmar={confirmarEliminacion}
          onCancelar={cancelarEliminacion}
        />
      )}
    </div>
  );
};