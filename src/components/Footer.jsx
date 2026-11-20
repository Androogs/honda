import { Link } from 'react-router-dom'
import { SITIO } from '../data/sitio.js'
import { IconArrowUp, IconClock, IconFacebook, IconInstagram, IconMail, IconPhone, IconPin, IconYoutube } from './Icons.jsx'
import Logo from './Logo.jsx'
import { useSede } from './SedeProvider.jsx'

/** Footer: marca + redes · navegación · atención · sede y líneas Honda · franja legal. */
export default function Footer() {
  const { sede } = useSede()
  const arriba = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <footer className="foot">
      <div className="container foot__grid">
        <div className="foot__brand">
          <Logo light />
          <p>{SITIO.eslogan}. Atención de ventas, taller y repuestos con SUMOTO S.A.</p>
          <div className="foot__social">
            <a href={SITIO.redes.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>
            <a href={SITIO.redes.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
            <a href={SITIO.redes.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><IconYoutube /></a>
            <a href={`mailto:${SITIO.email}`} aria-label="Correo electrónico"><IconMail /></a>
          </div>
        </div>
        <nav aria-label="Explora">
          <h2>Explora</h2>
          <Link to="/motocicletas">Motos</Link>
          <Link to="/comparar">Comparar</Link>
          <Link to="/financia-tu-moto">Financiación</Link>
          <Link to="/posventa">Posventa</Link>
        </nav>
        <nav aria-label="Servicio al cliente">
          <h2>Servicio al cliente</h2>
          <Link to="/contacto">Contacto</Link>
          <Link to="/concesionarios">Concesionario</Link>
          <Link to="/posventa#campanas">Campañas de seguridad</Link>
          <a href={SITIO.urls.terminos} target="_blank" rel="noreferrer">Términos y condiciones</a>
          <a href={SITIO.urls.privacidad} target="_blank" rel="noreferrer">Política de privacidad</a>
        </nav>
        <div className="foot__sede">
          <h2>{sede.nombre}</h2>
          <p className="foot__addr"><IconPin width={18} height={18} /> {sede.direccion || sede.ciudad}</p>
          <div className="foot__hours">
            <IconClock width={18} height={18} />
            <div>{SITIO.horarios.map((h) => <p key={h.dias} className="foot__hr"><span>{h.dias}</span><b>{h.horas.split(' / ').join('\n')}</b></p>)}</div>
          </div>
          <h2 className="foot__h2b">Líneas Honda Colombia</h2>
          {SITIO.lineasHonda.map((l) => <a key={l.ciudad} className="foot__tel" href={`tel:${l.tel}`}><IconPhone width={18} height={18} /> {l.ciudad}: {l.label}</a>)}
        </div>
      </div>
      <div className="foot__legal">
        <div className="container foot__legal-in">
          <div>
            <p>© {new Date().getFullYear()} {SITIO.empresa} · Concesionario autorizado Honda. Honda y su logotipo son marcas de Honda Motor Co., Ltd.</p>
            <p>Precios informativos con IVA, sujetos a cambio. No incluyen matrícula, SOAT ni seguros. En motos de más de 200 cc aplica impuesto al consumo en la facturación al cliente final. Imágenes de referencia.</p>
          </div>
          <button className="icon-btn icon-btn--glass" onClick={arriba} aria-label="Volver arriba"><IconArrowUp /></button>
        </div>
      </div>
    </footer>
  )
}
