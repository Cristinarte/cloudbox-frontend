import { Modal } from 'react-bootstrap';
import whatsapp from '../../assets/images/iconoWhatsapp.png';
import twitter from '../../assets/images/iconoX.png';
import facebook from '../../assets/images/iconoFacebook.png';
import mail from '../../assets/images/iconoMail.png';
import instagram from '../../assets/images/iconoInstagram.png';
import './Compartir.scss'; 


export const Compartir = ({ show, onHide, coleccion }) => {
  if (!coleccion) return null; // Asegura que la colección esté disponible

  const obtenerEnlacesCompartir = () => {
    const url = `https://tusitio.com/contenidos/${coleccion.id}`;
    const text = `Mira esta colección: ${coleccion.nombre}`;
    
    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      gmail: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      instagram: coleccion.usuarioInstagram 
        ? `https://www.instagram.com/${encodeURIComponent(coleccion.usuarioInstagram)}`
        : 'https://www.instagram.com/',
    };
  };

  const enlaces = obtenerEnlacesCompartir();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Compartir colección</Modal.Title>
      </Modal.Header>
      <Modal.Body className="compartir-body">
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