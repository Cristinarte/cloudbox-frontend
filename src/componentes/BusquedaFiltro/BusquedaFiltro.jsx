import { useState } from 'react';
import { Form } from 'react-bootstrap';

export const BusquedaFiltro = ({ onOrdenar, onBuscar }) => {
  const [orden, setOrden] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const manejarOrden = (tipoOrden) => {
    console.log('Click detectado, Orden seleccionado:', tipoOrden); // Depuración
    setOrden(tipoOrden);
    onOrdenar(tipoOrden);
  };

  const manejarBusqueda = (e) => {
    const termino = e.target.value;
    setTerminoBusqueda(termino);
    onBuscar(termino);
  };

  return (
    <div className="filtros d-flex justify-content-between mb-4">
      <div className="colecciones-busqueda d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder="Buscar colección..."
          className="form-control me-2"
          value={terminoBusqueda}
          onChange={manejarBusqueda}
        />
        <i className="fa fa-search search-icon"></i>
      </div>

      <div className="colecciones-busqueda d-flex align-items-center">
        <div className="dropdown">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-sliders filter-icon"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => manejarOrden('A-Z')}
              >
                De la A a la Z
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};