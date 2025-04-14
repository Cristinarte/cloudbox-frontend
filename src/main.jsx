import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/scss/variables-generales.scss';
import './assets/scss/_botones.scss';   
import './assets/scss/global.scss';  

import 'font-awesome/css/font-awesome.min.css';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
