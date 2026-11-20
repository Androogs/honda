import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import Inicio from './pages/Inicio.jsx'
import Motocicletas from './pages/Motocicletas.jsx'
import MotoDetalle from './pages/MotoDetalle.jsx'
import Comparar from './pages/Comparar.jsx'
import Posventa from './pages/Posventa.jsx'
import Concesionarios from './pages/Concesionarios.jsx'
import Financiacion from './pages/Financiacion.jsx'
import Contacto from './pages/Contacto.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal() // scroll reveal global (Intersection Observer)
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <ScrollToTop />
      <Header />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/motocicletas" element={<Motocicletas />} />
          <Route path="/motocicletas/:slug" element={<MotoDetalle />} />
          <Route path="/comparar" element={<Comparar />} />
          <Route path="/financia-tu-moto" element={<Financiacion />} />
          <Route path="/posventa" element={<Posventa />} />
          <Route path="/concesionarios" element={<Concesionarios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/repuestos" element={<Navigate to="/posventa#repuestos" replace />} />
          <Route path="/accesorios" element={<Navigate to="/posventa#accesorios" replace />} />
          <Route path="/campanas-de-seguridad" element={<Navigate to="/posventa#campanas" replace />} />
          <Route path="/live-store" element={<Navigate to="/contacto" replace />} />
          <Route path="/honda-te-cuenta" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
