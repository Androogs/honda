import { SEDES, SITIO, waClick, waLink } from '../data/sitio.js'
import { useSede } from '../components/SedeProvider.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconClock, IconExternal, IconPin, IconWhatsApp } from '../components/Icons.jsx'

export default function Concesionarios() {
  const { sede, setSede } = useSede()
  const lista = Object.values(SEDES)
  const msg = `Hola, quiero información sobre la sede de ${sede.ciudad}.`
  const q = encodeURIComponent(sede.direccion ? `${sede.direccion}, ${sede.ciudad}` : sede.mapaQuery)
  return (
    <>
      <PageHero titulo="Concesionarios" texto="Visítanos en el Valle del Cauca: ventas, taller y repuestos Honda con SUMOTO S.A." ruta={[{ label: 'Concesionarios' }]} />
      <section className="section">
        <div className="container sedes">
          <div className="sedes__list">
            {lista.map((s) => (
              <button key={s.id} className={`sede ${s.id === sede.id ? 'is-on' : ''}`} onClick={() => setSede(s.id)} aria-pressed={s.id === sede.id}>
                <span className="sede__pin"><IconPin /></span>
                <span>
                  <b>{s.nombre}</b>
                  <small>{s.direccion || s.ciudad}</small>
                </span>
              </button>
            ))}
            <div className="sedes__info">
              <h2>{sede.nombre}</h2>
              <p className="sedes__row"><IconPin width={18} height={18} /> {sede.direccion || `${sede.ciudad} (dirección por confirmar)`}</p>
              <div className="sedes__row sedes__hours">
                <IconClock width={18} height={18} />
                <div>{SITIO.horarios.map((h) => <p key={h.dias}><span>{h.dias}</span> {h.horas}</p>)}</div>
              </div>
              <div className="sedes__cta">
                <a className="btn btn--red" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer"><IconWhatsApp width={18} height={18} /> Escribir a la sede</a>
                <a className="btn btn--outline" href={sede.mapaUrl || `https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">Cómo llegar <IconExternal width={16} height={16} /></a>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe key={sede.id} title={`Mapa ${sede.nombre}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${q}&output=embed`} />
          </div>
        </div>
        <div className="container">
          <p className="note-line">¿Buscas otra ciudad? Consulta la red nacional de <a href={SITIO.urls.concesionarios} target="_blank" rel="noreferrer">concesionarios Honda <IconExternal width={13} height={13} /></a>.</p>
        </div>
      </section>
    </>
  )
}
