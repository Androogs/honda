import { useSearchParams } from 'react-router-dom'
import { useSede } from '../components/SedeProvider.jsx'
import { SITIO, waClick, waLink } from '../data/sitio.js'
import { MOTOS } from '../data/motos.js'
import LeadForm from '../components/LeadForm.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconCat, IconExternal, IconWhatsApp } from '../components/Icons.jsx'

/** Página compartida por Repuestos y Accesorios: categorías oficiales + cotizador por WhatsApp. */
export default function Catalogo({ tipo, titulo, texto, items, extra }) {
  const { sede } = useSede()
  const msg = `Hola, quiero cotizar ${tipo === 'repuestos' ? 'un repuesto' : 'un accesorio'} para mi moto Honda en ${sede.nombre}.`
  return (
    <>
      <PageHero titulo={titulo} texto={texto} ruta={[{ label: titulo }]}>
        <div className="phero__cta">
          <a className="btn btn--red" href={SITIO.urls.tienda} target="_blank" rel="noreferrer">Ir a la tienda oficial <IconExternal width={16} height={16} /></a>
          <a className="btn btn--outline-light" href={waLink(msg)} onClick={waClick(msg, tipo)} target="_blank" rel="noreferrer"><IconWhatsApp width={18} height={18} /> Cotizar con {sede.ciudad.split(',')[0]}</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="tiles">
            {items.map((it) => (
              <a key={it.id} id={it.id} className="tile" href={it.url} target="_blank" rel="noreferrer">
                <span className="tile__icon"><IconCat name={it.icono} /></span>
                <h2>{it.nombre}</h2>
                <p>{it.texto}</p>
                <span className="tile__go">Comprar en la tienda <IconExternal width={15} height={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container split">
          <div>
            <h2>{tipo === 'repuestos' ? 'Cotiza tu repuesto' : 'Cotiza tu accesorio'}</h2>
            <p className="lead">Cuéntanos qué necesitas y para qué moto. Nuestro equipo de {tipo === 'repuestos' ? 'repuestos' : 'accesorios'} te responde por WhatsApp con disponibilidad y valor.</p>
            {extra}
          </div>
          <div className="panel">
            <LeadForm tipo="repuestos" asunto={`Quiero cotizar ${tipo === 'repuestos' ? 'un repuesto' : 'un accesorio'}`}
              boton="Enviar solicitud"
              fields={[
                { name: 'nombre', label: 'Nombre completo', required: true },
                { name: 'celular', label: 'Celular', type: 'tel', required: true },
                { name: 'moto', label: 'Tu moto Honda', options: MOTOS.map((m) => m.nombre) },
                { name: 'detalle', label: tipo === 'repuestos' ? 'Repuesto / referencia' : 'Accesorio que buscas', required: true },
                ...(tipo === 'repuestos' ? [{ name: 'vin', label: 'Placa o VIN (opcional)' }] : []),
              ]} />
          </div>
        </div>
      </section>
    </>
  )
}
