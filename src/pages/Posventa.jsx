import { Link } from 'react-router-dom'
import { SITIO, waClick, waLink } from '../data/sitio.js'
import { MOTOS } from '../data/motos.js'
import { ACCESORIOS, REPUESTOS } from '../data/contenido.js'
import { useSede } from '../components/SedeProvider.jsx'
import LeadForm from '../components/LeadForm.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconArrow, IconCalendar, IconCat, IconCheck, IconExternal, IconShield, IconWhatsApp } from '../components/Icons.jsx'

export default function Posventa() {
  const { sede } = useSede()
  const msgCot = `Hola, quiero cotizar repuestos o accesorios para mi moto Honda en ${sede.nombre}.`
  return (
    <>
      <PageHero titulo="Posventa" texto="Taller especializado, repuestos y accesorios originales y campañas de seguridad: cuidamos tu Honda después de la compra." ruta={[{ label: 'Posventa' }]}>
        <div className="phero__cta">
          <Link className="btn btn--red btn--lg" to="#taller"><IconCalendar width={20} height={20} /> Agendar cita al taller</Link>
          <a className="btn btn--outline-light btn--lg" href={waLink(msgCot)} onClick={waClick(msgCot, 'repuestos')} target="_blank" rel="noreferrer"><IconWhatsApp width={20} height={20} /> Cotizar repuestos</a>
        </div>
      </PageHero>

      <section className="section posv__sec" id="taller">
        <div className="container split">
          <div>
            <h2>Taller especializado Honda</h2>
            <p className="lead">Agenda tu cita en el taller de tu sede. Trabajamos con los estándares de la marca para mantener tu moto como el primer día.</p>
            <ul className="features">
              <li><IconCheck width={20} height={20} /> Técnicos capacitados por Honda</li>
              <li><IconCheck width={20} height={20} /> Repuestos originales y lubricantes Pro Honda</li>
              <li><IconCheck width={20} height={20} /> Mantenimiento preventivo y correctivo</li>
              <li><IconCheck width={20} height={20} /> Atención de garantías y campañas de seguridad</li>
            </ul>
          </div>
          <div className="panel">
            <LeadForm tipo="taller" asunto="Quiero agendar una cita en el taller" boton="Agendar con el taller"
              fields={[
                { name: 'nombre', label: 'Nombre completo', required: true },
                { name: 'celular', label: 'Celular', type: 'tel', required: true },
                { name: 'moto', label: 'Tu moto Honda', options: MOTOS.map((m) => m.nombre) },
                { name: 'placa', label: 'Placa', required: true },
                { name: 'servicio', label: 'Servicio', options: ['Mantenimiento preventivo', 'Cambio de aceite', 'Revisión general', 'Garantía', 'Campaña de seguridad', 'Otro'] },
                { name: 'fecha', label: 'Fecha preferida', type: 'date' },
              ]} />
          </div>
        </div>
      </section>

      <section className="section section--mist posv__sec" id="repuestos">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2>Repuestos originales</h2>
              <p className="sec-sub">Baterías, llantas, lubricantes Pro Honda y repuestos genuinos para tu moto.</p>
            </div>
            <a className="link-arrow" href={SITIO.urls.tienda} target="_blank" rel="noreferrer">Tienda oficial Honda <IconExternal width={18} height={18} /></a>
          </div>
          <div className="tiles">
            {REPUESTOS.map((it) => (
              <a key={it.id} className="tile" href={it.url} target="_blank" rel="noreferrer">
                <span className="tile__icon"><IconCat name={it.icono} /></span>
                <h2>{it.nombre}</h2>
                <p>{it.texto}</p>
                <span className="tile__go">Comprar en la tienda <IconExternal width={15} height={15} /></span>
              </a>
            ))}
          </div>
          <p className="note-line">
            <a href={SITIO.urls.vin} target="_blank" rel="noreferrer">Buscar repuestos por código VIN <IconExternal width={15} height={15} /></a>
            {' · '}¿No encuentras el repuesto? <a href={waLink(msgCot)} onClick={waClick(msgCot, 'repuestos')} target="_blank" rel="noreferrer">Cotízalo por WhatsApp</a>
          </p>
        </div>
      </section>

      <section className="section posv__sec" id="accesorios">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2>Accesorios</h2>
              <p className="sec-sub">Cascos, defensas, equipaje, limpieza, seguridad y la ropa oficial Honda Store.</p>
            </div>
            <a className="link-arrow" href={waLink(msgCot)} onClick={waClick(msgCot, 'repuestos')} target="_blank" rel="noreferrer">Cotizar accesorios <IconArrow width={18} height={18} /></a>
          </div>
          <div className="tiles">
            {ACCESORIOS.map((it) => (
              <a key={it.id} className="tile" href={it.url} target="_blank" rel="noreferrer">
                <span className="tile__icon"><IconCat name={it.icono} /></span>
                <h2>{it.nombre}</h2>
                <p>{it.texto}</p>
                <span className="tile__go">Comprar en la tienda <IconExternal width={15} height={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist posv__sec" id="campanas">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2><IconShield width={30} height={30} /> Campañas de seguridad</h2>
              <p className="sec-sub">Verifica si tu moto tiene una campaña activa y agenda la revisión sin costo.</p>
            </div>
            <a className="btn btn--red" href={SITIO.urls.campanas} target="_blank" rel="noreferrer">Verificar mi moto en Honda <IconExternal width={16} height={16} /></a>
          </div>
          <ol className="stepcards">
            <li><span>1</span><h2>Ubica tu VIN</h2><p>Es el número de identificación de tu moto. Lo encuentras en los documentos del vehículo.</p></li>
            <li><span>2</span><h2>Verifica en Honda</h2><p>Consulta en el portal oficial de Honda Colombia si tu moto tiene alguna campaña activa.</p></li>
            <li><span>3</span><h2>Agenda con Sumoto</h2><p>Si tu moto aparece en una campaña, coordina tu cita con el taller de tu sede.</p></li>
          </ol>
        </div>
      </section>
    </>
  )
}
