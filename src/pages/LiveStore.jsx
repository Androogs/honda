import { SITIO } from '../data/sitio.js'
import { MOTOS } from '../data/motos.js'
import LeadForm from '../components/LeadForm.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconCheck, IconExternal, IconPlay } from '../components/Icons.jsx'

export default function LiveStore() {
  return (
    <>
      <PageHero titulo="Live Store" texto="Sumérgete en un mundo en el que la realidad supera cualquier tipo de ficción." ruta={[{ label: 'Live Store' }]}>
        <div className="phero__cta">
          <a className="btn btn--red btn--lg" href={SITIO.urls.liveStore} target="_blank" rel="noreferrer"><IconPlay width={20} height={20} /> Entrar al Live Store de Honda <IconExternal width={16} height={16} /></a>
        </div>
      </PageHero>
      <section className="section">
        <div className="container split">
          <div>
            <h2>Asesoría en vivo con Sumoto</h2>
            <p className="lead">Elige el día y la hora que prefieras y un asesor de tu sede te contacta para resolver tus dudas sobre la moto que te interesa.</p>
            <ul className="features">
              <li><IconCheck width={20} height={20} /> Cuéntanos qué moto te interesa</li>
              <li><IconCheck width={20} height={20} /> Elige tu horario de contacto</li>
              <li><IconCheck width={20} height={20} /> Recibe la cotización por WhatsApp</li>
            </ul>
          </div>
          <div className="panel">
            <LeadForm asunto="Quiero una asesoría en vivo" boton="Solicitar asesoría"
              fields={[
                { name: 'nombre', label: 'Nombre completo', required: true },
                { name: 'celular', label: 'Celular', type: 'tel', required: true },
                { name: 'moto', label: 'Moto de interés', options: MOTOS.map((m) => m.nombre) },
                { name: 'horario', label: 'Horario preferido', options: ['Mañana', 'Tarde', 'Noche'] },
              ]} />
          </div>
        </div>
      </section>
    </>
  )
}
