import { SITIO } from '../data/sitio.js'
import { MOTOS } from '../data/motos.js'
import LeadForm from '../components/LeadForm.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconAlert, IconExternal } from '../components/Icons.jsx'

export default function Campanas() {
  return (
    <>
      <PageHero titulo="Campañas de seguridad" texto="Campañas de seguridad Honda: verifica tu moto y pon a rodar tus sueños." ruta={[{ label: 'Campañas de seguridad' }]}>
        <div className="phero__cta">
          <a className="btn btn--red btn--lg" href={SITIO.urls.campanas} target="_blank" rel="noreferrer">Verificar mi moto en Honda <IconExternal width={16} height={16} /></a>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <ol className="stepcards">
            <li><span>1</span><h2>Ubica tu VIN</h2><p>Es el número de identificación de tu moto. Lo encuentras en los documentos del vehículo.</p></li>
            <li><span>2</span><h2>Verifica en Honda</h2><p>Consulta en el portal oficial de Honda Colombia si tu moto tiene alguna campaña activa.</p></li>
            <li><span>3</span><h2>Agenda con Sumoto</h2><p>Si tu moto aparece en una campaña, coordina tu cita con el taller de tu sede.</p></li>
          </ol>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container split">
          <div>
            <h2><IconAlert width={28} height={28} /> ¿Necesitas ayuda?</h2>
            <p className="lead">Escríbenos con los datos de tu moto y te ayudamos a coordinar la revisión en el taller.</p>
          </div>
          <div className="panel">
            <LeadForm tipo="taller" asunto="Quiero agendar mi cita por campaña de seguridad" boton="Agendar con el taller"
              fields={[
                { name: 'nombre', label: 'Nombre completo', required: true },
                { name: 'celular', label: 'Celular', type: 'tel', required: true },
                { name: 'moto', label: 'Tu moto Honda', options: MOTOS.map((m) => m.nombre) },
                { name: 'placa', label: 'Placa', required: true },
                { name: 'fecha', label: 'Fecha preferida', type: 'date' },
              ]} />
          </div>
        </div>
      </section>
    </>
  )
}
