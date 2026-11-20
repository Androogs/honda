import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { aniosDe, cop, getCategoria, getMoto, imgMoto, motosDe, precioDe } from '../data/motos.js'
import { FICHAS } from '../data/fichas.js'
import { waClick, waLink } from '../data/sitio.js'
import MotoCard from '../components/MotoCard.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { IconCard, IconCheck, IconExternal, IconWhatsApp } from '../components/Icons.jsx'
import { useSede } from '../components/SedeProvider.jsx'
import NoEncontrado from './NoEncontrado.jsx'

export default function MotoDetalle() {
  const { slug } = useParams()
  const moto = getMoto(slug)
  const { sede } = useSede()
  const [color, setColor] = useState(null)
  const [verId, setVerId] = useState(null)
  const [anio, setAnio] = useState(null)

  useEffect(() => { setColor(null); setVerId(null); setAnio(null) }, [slug])
  if (!moto) return <NoEncontrado />

  const cat = getCategoria(moto.categoria)
  const ficha = FICHAS[moto.slug]
  const colorObj = moto.colores.find((c) => c.id === color) || moto.colores[0]
  const ver = moto.versiones.find((v) => v.id === verId) || moto.versiones[0]
  const anios = aniosDe(ver)
  const anioSel = anios.includes(anio) ? anio : anios[0]
  const precio = precioDe(ver, anioSel)
  const msg = `Hola, quiero cotizar la Honda ${ver.nombre} modelo ${anioSel} color ${colorObj.nombre} en ${sede.nombre}.`
  const otras = motosDe(moto.categoria).filter((m) => m.slug !== moto.slug).slice(0, 4)

  return (
    <>
      <section className="pdp">
        <div className="container pdp__grid">
          <div className="pdp__visual">
            <nav className="crumbs" aria-label="Ruta">
              <Link to="/">Inicio</Link><Link to="/motocicletas">Motocicletas</Link>
              <Link to={`/motocicletas?cat=${cat.id}`}>{cat.nombre}</Link><span aria-current="page">{moto.nombre}</span>
            </nav>
            <div className="pdp__stage">
              <span className="pdp__ghost" aria-hidden="true">{moto.nombre}</span>
              {moto.nueva && <span className="tag">Nueva</span>}
              <img key={colorObj.id} src={imgMoto(moto, colorObj.id)} alt={`Honda ${moto.nombre} color ${colorObj.nombre}`} />
            </div>
            <div className="pdp__colors">
              <span>Color: <b>{colorObj.nombre}</b></span>
              <div className="pdp__swatches" role="radiogroup" aria-label="Color">
                {moto.colores.map((c) => (
                  <button key={c.id} role="radio" aria-checked={c.id === colorObj.id} aria-label={c.nombre} title={c.nombre}
                    className={`sw ${c.id === colorObj.id ? 'is-on' : ''}`} style={{ '--c': c.swatch }} onClick={() => setColor(c.id)} />
                ))}
              </div>
            </div>
          </div>

          <aside className="pdp__info">
            <span className="kicker">{cat.nombre}</span>
            <h1>Honda {moto.nombre}</h1>
            <p className="pdp__lema">{moto.lema}</p>

            {moto.versiones.length > 1 && (
              <div className="opt">
                <span className="opt__label">Versión</span>
                <div className="opt__row">
                  {moto.versiones.map((v) => (
                    <button key={v.id} className={`pill ${v.id === ver.id ? 'is-on' : ''}`} onClick={() => setVerId(v.id)}>{v.nombre}</button>
                  ))}
                </div>
              </div>
            )}
            {anios.length > 1 && (
              <div className="opt">
                <span className="opt__label">Año modelo</span>
                <div className="opt__row">
                  {anios.map((a) => (
                    <button key={a} className={`pill ${a === anioSel ? 'is-on' : ''}`} onClick={() => setAnio(a)}>{a}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="price">
              <small>Precio público · {ver.nombre} · modelo {anioSel}</small>
              <strong>{cop(precio)}</strong>
              <p>Incluye IVA. No incluye matrícula, SOAT ni seguros.{moto.consumo ? ' En motos de más de 200 cc se aplica impuesto al consumo en la facturación al cliente final.' : ''} Precio sujeto a cambio sin previo aviso.</p>
            </div>

            <div className="pdp__cta">
              <a className="btn btn--red btn--lg btn--block" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer"><IconWhatsApp width={20} height={20} /> Cotizar por WhatsApp</a>
              <div className="pdp__cta2">
                <Link className="btn btn--outline" to={`/financia-tu-moto?moto=${moto.slug}`}><IconCard width={18} height={18} /> Financiar</Link>
                <a className="btn btn--outline" href={moto.oficial} target="_blank" rel="noreferrer">Ficha Honda <IconExternal width={16} height={16} /></a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container specs">
          <div>
            <h2>Ficha técnica</h2>
            {ficha ? (
              <>
                <div className="kpis">
                  <div><small>Cilindraje</small><b>{ficha.kpis.cc}</b></div>
                  <div><small>Potencia</small><b>{ficha.kpis.potencia}</b></div>
                  <div><small>Torque</small><b>{ficha.kpis.torque}</b></div>
                </div>
                <div className="acc">
                  {Object.entries(ficha.specs).map(([grupo, filas], k) => (
                    <details key={grupo} open={k === 0}>
                      <summary>{grupo}</summary>
                      <dl>{filas.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
                    </details>
                  ))}
                </div>
                <p className="fine">Fuente: ficha técnica oficial de Honda Colombia. Especificaciones sujetas a cambio por parte del fabricante.</p>
              </>
            ) : (
              <div className="pending">
                <h3>Consulta la ficha técnica oficial</h3>
                <p>Motor, seguridad, características y dimensiones (ruedas, medidas totales, distancia entre ejes y peso) de la {moto.nombre} están en la ficha oficial de Honda Colombia.</p>
                <a className="btn btn--outline" href={moto.oficial} target="_blank" rel="noreferrer">Ver ficha oficial <IconExternal width={16} height={16} /></a>
              </div>
            )}
          </div>
          <div>
            <h2>{ficha ? 'Destacados' : 'Colores disponibles'}</h2>
            <ul className="features">
              {ficha
                ? ficha.destacados.map((d) => <li key={d}><IconCheck width={20} height={20} /> {d}</li>)
                : moto.colores.map((c) => <li key={c.id}><i style={{ background: c.swatch }} /> {c.nombre}</li>)}
            </ul>
            <div className="visit">
              <h3>Agenda tu visita en {sede.ciudad.split(',')[0]}</h3>
              <p>Conoce la {moto.nombre} en persona y resuelve tus dudas con un asesor.</p>
              <LeadForm asunto={`Quiero agendar una visita para ver la ${moto.nombre}`} boton="Agendar visita"
                initial={{ moto: moto.nombre }}
                fields={[
                  { name: 'nombre', label: 'Nombre completo', required: true },
                  { name: 'celular', label: 'Celular', type: 'tel', required: true },
                  { name: 'fecha', label: 'Fecha preferida', type: 'date' },
                  { name: 'moto', label: 'Moto de interés' },
                ]} />
            </div>
          </div>
        </div>
      </section>

      {otras.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="sec-head"><h2>Más {cat.nombre.toLowerCase()}</h2></div>
            <div className="grid grid--4">{otras.map((m) => <MotoCard key={m.slug} moto={m} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
