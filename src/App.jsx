import { useState, useEffect } from 'react';
import { Nav } from './componentes/nav/Nav';
import { HeroSection } from './componentes/HeroSection/HeroSection';
import { Content } from './componentes/Contenido/Content';
import { Footer } from './componentes/Footer/Footer';
import { FAQSection } from './componentes/FAQSection/FAQSection';
import { Registro } from './componentes/Registro/Registro';
import { Inicio } from './componentes/Inicio/Inicio';
import { Sidebar } from './componentes/Sidebar/Sidebar';
import { Panel } from './componentes/Panel/Panel';
import { Dashboard } from './componentes/Dashboard/Dashboard';
import { DashboardColecciones } from './componentes/DashboardColecciones/DashboardColecciones';
import { DashboardContenidos } from './componentes/DashboardContenidos/DashboardContenidos';
import { DashboardAgenda } from './componentes/DashboardAgenda/DashboardAgenda';
import { SobreNosotros } from './componentes/SobreNosotros/SobreNosotros';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RecuperarContrasenia } from './componentes/Inicio/RecuperarContrasenia';
import { EmailEnviado } from './componentes/Inicio/EmailEnviado';
import { RestablecerContrasenia } from './componentes/Inicio/RestablecerContrasenia';





const App=()=> {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [alias, setAlias] = useState(localStorage.getItem('alias'));


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    if (alias) {
      localStorage.setItem('alias', alias);
    }
  }, [token, alias]);

  console.log('Estado en App:', { token, alias });



  return (
    <Router>
      <Routes>

        {/*Ruta para la home*/}
        <Route
          path="/"
          element={
            <>
              <Nav token={token} setToken={setToken} />
              <div className="content">
                {!token && <HeroSection />}
                {!token && <Content />}
                {!token && <FAQSection />}
                {!token && <Footer />}
              </div>
            </>
          }
        />

        {/*Ruta para registro*/}
        <Route
          path="/register"
          element={<Registro/>}
        />

        {/*Ruta para login*/}
        <Route
          path="/login"
          element={<Inicio setToken={setToken} setAlias={setAlias}/>}
        /> 

        {/* Ruta para Sobre Nosotros */}
        <Route
          path="/sobre-nosotros"
          element={
            <>
              <Nav token={token} setToken={setToken} />
              <SobreNosotros />
              <Footer />
            </>
          }
        />

        {/*Ruta para panel de logeado*/}
        <Route
          path="/dashboard"
          element={
            token ? (
              <>
                <Nav token={token} setToken={setToken} />
                <Dashboard alias={alias}/>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/recuperar-contrasenia"
          element={<RecuperarContrasenia />}
        />

        <Route
          path="/email-enviado"
          element={<EmailEnviado />}
        />

        <Route
          path="/password-reset/:token"
          element={<RestablecerContrasenia />}
        />

        {/*Ruta para mostrar colecciones*/}
        <Route
          path="/colecciones"
          element={
            token ? (
              <>
                <Nav token={token} setToken={setToken} />
                <DashboardColecciones/>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/*Ruta para mostrar contenidos*/}
        <Route
          path="/contenidos/:coleccionId"
          element={
            token ? (
              <>
                <Nav token={token} setToken={setToken} />
                <DashboardContenidos/>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

