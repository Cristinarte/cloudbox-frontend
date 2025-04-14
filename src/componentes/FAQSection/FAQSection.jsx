import React from 'react';
import './FAQSection.scss';

export const FAQSection = () => {
  return (

    <div className='container-preguntas'>
    
    <div className="faq-container">
      <div className="titulo-faq">
        <p className="faq-title">Preguntas</p>
        <p className="faq-title">Frecuentes</p>
      </div>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        {/* Pregunta 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              ¿Cómo puedo agregar una nueva URL?
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Para agregar una nueva URL, primero debes registrarte e iniciar sesión en la plataforma. Luego, dirígete a la sección de Colecciones, donde podrás organizar tus enlaces según su temática. Primero, crea una Colección para agrupar URLs relacionadas y, una vez creada, ábrela y pulsa el botón de Agregar URL. Así podrás guardar y gestionar tus enlaces de manera ordenada.</div>
          </div>
        </div>

        {/* Pregunta 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              ¿Es seguro guardar mis URLs en esta web?
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Sí, la seguridad de tus datos es una prioridad para nosotros. Implementamos protocolos de cifrado y almacenamiento seguro para proteger tu información. Además, solo tú puedes acceder a tus colecciones a menos que decidas compartirlas.</div>
          </div>
        </div>

        {/* Pregunta 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              ¿Puedo organizar mi contenido en carpetas o categorías?
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Sí, precisamente esa es la idea. Puedes crear Colecciones para organizar tus URLs según el tema, lo que te permitirá acceder rápidamente a la información cuando la necesites.</div>
          </div>
        </div>

        {/* Pregunta 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              ¿Puedo acceder a mis contenidos desde cualquier dispositivo?
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Sí, la plataforma es totalmente responsive, lo que significa que puedes acceder a tus URLs desde cualquier dispositivo, ya sea un ordenador, tablet o smartphone, sin perder funcionalidad.</div>
          </div>
        </div>

        {/* Pregunta 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              ¿Cuántas URLs puedo guardar?
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">No hay límites. Puedes guardar tantas URLs como necesites y organizarlas en distintas colecciones sin restricciones.</div>
          </div>
        </div>

        {/* Pregunta 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
            >
              ¿Mi cuenta tiene algún costo?
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">No, el servicio es completamente gratuito. Puedes registrarte y empezar a guardar y organizar tus URLs sin ningún tipo de pago.</div>
          </div>
        </div>

        {/* Pregunta 7 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSeven"
              aria-expanded="false"
              aria-controls="flush-collapseSeven"
            >
              ¿Hay una función de búsqueda para encontrar mis URLs rápidamente?
            </button>
          </h2>
          <div
            id="flush-collapseSeven"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Sí, puedes utilizar el buscador integrado para localizar cualquier URL dentro de tus colecciones de manera rápida y sencilla.</div>
          </div>
        </div>

        {/* Pregunta 8 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseEight"
              aria-expanded="false"
              aria-controls="flush-collapseEight"
            >
              ¿Puedo editar o eliminar una URL después de guardarla?
            </button>
          </h2>
          <div
            id="flush-collapseEight"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Sí, puedes modificar o eliminar cualquier URL dentro de tus colecciones en cualquier momento. Solo necesitas ir a la URL guardada y seleccionar la opción de editar o eliminar.</div>
          </div>
        </div>
      </div>
    </div>
     
    </div>
  );
};
