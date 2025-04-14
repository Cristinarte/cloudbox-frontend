import React from 'react'
import './Content.scss';
import vector2 from '../../assets/images/vector2.png';
export const Content = () => {
  // Prueba de cambio en rama cristina
  return (
    <div className="content-container">
        <div className="content-text">
            <p className="">Gestiona y organiza</p>
            <p className="">tus URLs de forma sencilla</p>
            <p className="">Accede a tus contenidos desde un solo lugar</p>
        </div>
        <img src={vector2} className="content-image rounded mx-auto d-block" alt="Descripción de la imagen" />
    </div>
  )
}
