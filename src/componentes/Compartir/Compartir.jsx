import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import whatsapp from '../../assets/images/iconoWhatsapp.png';
import twitter from '../../assets/images/iconoX.png';
import facebook from '../../assets/images/iconoFacebook.png';
import mail from '../../assets/images/iconoMail.png';
import instagram from '../../assets/images/iconoInstagram.png';
import './Compartir.scss';
import { API_URL } from '../../api';

export const Compartir = ({ show, onHide, coleccion, tipo = 'coleccion', contenido = null }) => {
  const [enlaceCompartido, setEnlaceCompartido] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && (coleccion || contenido)) {
      const obtenerEnlaceCompartido = async () => {
        try {
          const id = tipo === 'coleccion' ? coleccion?.id : contenido?.id;
          const token = localStorage.getItem('token');

          if (!id || !token) {
            throw new Error('Falta información necesaria');
          }

          const res = await axios.post(
            `${API_URL}/${tipo === 'coleccion' ? 'colecciones' : 'contenidos'}/${id}/share`,
            { tipo },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          // Usar la URL del backend (que es del frontend)
          setEnlaceCompartido(res.data.url);
        } catch (err) {
          console.error('Error al generar enlace compartido:', err);
          setError('No se pudo generar el enlace para compartir');
        }
      };

      obtenerEnlaceCompartido();
    }
  }, [show, coleccion, contenido, tipo]);

  const obtenerEnlacesCompartir = () => {
    if (!enlaceCompartido) {
      const url = `${window.location.origin}/compartido/${coleccion?.id || ''}`;
      const text = `Mira esta colección: ${coleccion?.nombre || ''}`;

      return {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        gmail: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
        instagram: coleccion?.usuarioInstagram
          ? `https://www.instagram.com/${encodeURIComponent(coleccion.usuarioInstagram)}`
          : 'https://www.instagram.com/',
      };
    }

    const titulo = tipo === 'coleccion'
      ? `Mira esta colección: ${coleccion?.nombre}`
      : `Mira este contenido: ${contenido?.titulo}`;

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${titulo} ${enlaceCompartido}`)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(enlaceCompartido)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(enlaceCompartido)}`,
      gmail: `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(enlaceCompartido)}`,
      instagram: coleccion?.usuarioInstagram
        ? `https://www.instagram.com/${encodeURIComponent(coleccion.usuarioInstagram)}`
        : 'https://www.instagram.com/',
    };
  };

  const enlaces = obtenerEnlacesCompartir();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Compartir {tipo === 'coleccion' ? 'colección' : 'contenido'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="compartir-body">
        {error && <p className="text-danger">{error}</p>}

        <a href={enlaces.whatsapp} target="_blank" rel="noopener noreferrer">
          <img src={whatsapp} alt="WhatsApp" className="compartir-icon" />
        </a>
        <a href={enlaces.twitter} target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" className="compartir-icon" />
        </a>
        <a href={enlaces.facebook} target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" className="compartir-icon" />
        </a>
        <a href={enlaces.gmail} target="_blank" rel="noopener noreferrer">
          <img src={mail} alt="Gmail" className="compartir-icon" />
        </a>
        <a href={enlaces.instagram} target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" className="compartir-icon" />
        </a>
      </Modal.Body>
    </Modal>
  );
};