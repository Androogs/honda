import { useState } from 'react'
import { PREGUNTAS } from '../data/contenido.js'
import { SITIO, waClick, waLink } from '../data/sitio.js'
import { useSede } from '../components/SedeProvider.jsx'
import LeadForm from '../components/LeadForm.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from '../components/Icons.jsx'

export default function Contacto() {
  const { sede } = useSede()
  const [abierta, setAbierta] = useState(0)
  const msg = `Hola, quiero hablar con un asesor de ${sede.nombre}.`
  return (
    <>
      <PageHero titulo="Contáctenos" texto="Te ayudamos en cada paso. Escríbenos por WhatsApp, llámanos o visítanos en tu sede." ruta={[{ label: 'Contáctenos' }]} />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <h2>Canales de atención</h2>
            <a className="channel channel--wa" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer">
              <IconWhatsApp width={26} height={26} /><span><b>WhatsApp {sede.ciudad.split(',')[0]}</b><small>{sede.asesores[0].label || 'Habla con un asesor ahora'}</small></span>
            </a>
            <a className="channel" href={`mailto:${SITIO.email}`}><IconMail width={26} height={26} /><span><b>Correo</b><small>{SITIO.email}</small></span></a>
            <div className="channel"><IconPin width={26} height={26} /><span><b>{sede.nombre}</b><small>{sede.direccion || sede.ciudad}</small></span></div>
            <div className="channel"><IconClock width={26} height={26} /><span><b>Horario</b>{SITIO.horarios.map((h) => <small key={h.dias}>{h.dias}: {h.horas}</small>)}</span></div>
            <h3>Líneas Honda Colombia</h3>
            {SITIO.lineasHonda.map((l) => (
              <a key={l.ciudad} className="channel channel--slim" href={`tel:${l.tel}`}><IconPhone width={20} height={20} /><span><b>{l.ciudad}</b><small>{l.label}</small></span></a>
            ))}
          </div>
          <div className="panel">
            <h2>Déjanos tu mensaje</h2>
            <LeadForm asunto="Tengo una consulta" boton="Enviar por WhatsApp"
              fields={[
                { name: 'nombre', label: 'Nombre completo', required: true },
                { name: 'celular', label: 'Celular', type: 'tel', required: true },
                { name: 'motivo', label: 'Motivo', options: ['Quiero comprar una moto', 'Financiación', 'Taller / mantenimiento', 'Repuestos y accesorios', 'Campañas de seguridad', 'Otro'] },
                { name: 'mensaje', label: 'Mensaje', rows: 4 },
              ]} />
          </div>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container faq">
          <h2>Preguntas frecuentes</h2>
          <div className="faq__list">
            {PREGUNTAS.map((p, k) => (
              <div key={p.q} className={`faq__item ${abierta === k ? 'is-open' : ''}`}>
                <h3><button onClick={() => setAbierta(abierta === k ? -1 : k)} aria-expanded={abierta === k}>{p.q}<i /></button></h3>
                {abierta === k && <p>{p.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
