import { Link } from 'react-router-dom'
import { cop, imgMoto, precioDesde, getCategoria } from '../data/motos.js'
import { waClick, waLink } from '../data/sitio.js'
import { useSede } from './SedeProvider.jsx'
import { IconArrow, IconWhatsApp } from './Icons.jsx'

export default function MotoCard({ moto }) {
  const { sede } = useSede()
  const d = precioDesde(moto)
  const cat = getCategoria(moto.categoria)
  const msg = `Hola, quiero cotizar la ${moto.nombre} en ${sede.nombre}.`
  return (
    <article className="mcard">
      <Link to={`/motocicletas/${moto.slug}`} className="mcard__media" aria-label={`Ver ${moto.nombre}`}>
        {moto.nueva && <span className="tag">Nueva</span>}
        <img src={imgMoto(moto)} alt={`Honda ${moto.nombre}`} loading="lazy" />
      </Link>
      <div className="mcard__body">
        <span className="mcard__cat">{cat.nombre}</span>
        <h3><Link to={`/motocicletas/${moto.slug}`}>{moto.nombre}</Link></h3>
        <div className="mcard__swatches" aria-label="Colores disponibles">
          {moto.colores.map((c) => <i key={c.id} title={c.nombre} style={{ background: c.swatch }} />)}
        </div>
        <p className="mcard__price"><small>{moto.versiones.length > 1 ? 'Desde' : 'Precio'} · modelo {d.anio}</small><strong>{cop(d.precio)}</strong></p>
        <div className="mcard__cta">
          <a className="btn btn--red btn--sm" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer"><IconWhatsApp width={18} height={18} /> Cotizar</a>
          <Link className="btn btn--ghost btn--sm" to={`/motocicletas/${moto.slug}`}>Ver más <IconArrow width={16} height={16} /></Link>
        </div>
      </div>
    </article>
  )
}
