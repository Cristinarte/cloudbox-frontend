import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Importar el CSS

// Configurar el localizador con moment.js
const localizer = momentLocalizer(moment);

export const Agenda = () => {
  // Crear algunos eventos de ejemplo
  const [events, setEvents] = useState([
    {
      title: 'Reunión de trabajo',
      start: new Date(2025, 3, 10, 10, 0), // Abril 10, 2025 a las 10:00 AM
      end: new Date(2025, 3, 10, 11, 0),   // Abril 10, 2025 a las 11:00 AM
    },
    {
      title: 'Cita médica',
      start: new Date(2025, 3, 12, 14, 0), // Abril 12, 2025 a las 2:00 PM
      end: new Date(2025, 3, 12, 15, 0),   // Abril 12, 2025 a las 3:00 PM
    },
  ]);

  return (
    <div style={{ height: '80vh', padding: '20px' }}>
      <h2>Agenda</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
