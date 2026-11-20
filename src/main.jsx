import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Tipografía: Sora (display) + DM Sans (cuerpo), autoalojadas vía Fontsource (sin peticiones a terceros)
import '@fontsource-variable/sora'
import '@fontsource-variable/dm-sans'
import App from './App.jsx'
import { SedeProvider } from './components/SedeProvider.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SedeProvider>
        <App />
      </SedeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
