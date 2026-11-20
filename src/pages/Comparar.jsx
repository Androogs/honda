import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOTOS, aniosDe, cop, getCategoria, getMoto, imgMoto, precioDe, precioDesde } from '../data/motos.js'
import { waClick, waLink } from '../data/sitio.js'
import { useSede } from '../components/SedeProvider.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconClose, IconPlus, IconWhatsApp } from '../components/Icons.jsx'

const FILAS = [
  { label: 'Categoría', render: (m) => getCategoria(m.categoria)?.nombre || '—' },
  {
    label: 'Precio desde',
    render: (m) => {
      const d = precioDesde(m)
      return <span className="cmp__price">{cop(d.precio)}<small>Modelo {d.anio} · con IVA</small></span>
    },
  },
  {
    label: 'Versiones y precios',
    render: (m) => (
      <ul className="cmp__vers">
        {m.versiones.map((v) => (
          <li key={v.id}>
            <b>{v.nombre}</b>
            <small>{aniosDe(v).map((a) => `${a}: ${cop(precioDe(v, a))}`).join(' · ')}</small>
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Colores',
    render: (m) => (
      <span className="cmp__sw">
        {m.colores.map((c) => <i key={c.id} style={{ '--c': c.swatch }} title={c.nombre} />)}
        <small>{m.colores.length} {m.colores.length === 1 ? 'color' : 'colores'}</small>
      </span>
    ),
  },
]

export default function Comparar() {
  const { sede } = useSede()
  const [sel, setSel] = useState(['cb-190r', 'cb-300f'])
  const elegidas = sel.map((s) => (s ? getMoto(s) : null))
  const setSlot = (i, slug) => setSel((p) => p.map((x, k) => (k === i ? slug || null : x)))
  const quitar = (i) => setSel((p) => p.filter((_, k) => k !== i))
  const agregar = () => setSel((p) => (p.length < 3 ? [...p, null] : p))

  return (
    <>
      <PageHero titulo="Comparar motos" texto="Elige hasta tres motos Honda y compara precios, versiones y colores lado a lado." ruta={[{ label: 'Comparar' }]} />

      <section className="section">
        <div className="container">
          <div className="cmp__wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th aria-label="Características" />
                  {elegidas.map((m, i) => (
                    <th key={i} scope="col">
                      <div className="cmp__colhead">
                        {m ? (
                          <Link className="cmp__bike" to={`/motocicletas/${m.slug}`}>
                            <img src={imgMoto(m)} alt={`Honda ${m.nombre}`} />
                            <b>{m.nombre}</b>
                          </Link>
                        ) : <span className="cmp__empty">Elige una moto para comparar</span>}
                        {sel.length > 2 && (
                          <button className="icon-btn cmp__rm" onClick={() => quitar(i)} aria-label={`Quitar columna ${i + 1}`}><IconClose width={18} height={18} /></button>
                        )}
                      </div>
                      <label className="select cmp__select">
                        <span className="sr">Moto {i + 1}</span>
                        <select value={sel[i] || ''} onChange={(e) => setSlot(i, e.target.value)} aria-label={`Moto ${i + 1} a comparar`}>
                          <option value="">Elige una moto…</option>
                          {MOTOS.map((x) => <option key={x.slug} value={x.slug}>{x.nombre}</option>)}
                        </select>
                      </label>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FILAS.map((f) => (
                  <tr key={f.label}>
                    <th scope="row">{f.label}</th>
                    {elegidas.map((m, i) => <td key={i}>{m ? f.render(m) : '—'}</td>)}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Acciones</th>
                  {elegidas.map((m, i) => (
                    <td key={i}>
                      {m && (
                        <div className="cmp__cta">
                          <Link className="btn btn--outline btn--sm" to={`/motocicletas/${m.slug}`}>Ver ficha</Link>
                          <a className="btn btn--red btn--sm" href={waLink(`Hola, quiero cotizar la ${m.nombre} en ${sede.nombre}.`)} onClick={waClick(`Hola, quiero cotizar la ${m.nombre} en ${sede.nombre}.`)} target="_blank" rel="noreferrer"><IconWhatsApp width={16} height={16} /> Cotizar</a>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {sel.length < 3 && <button className="btn btn--ghost cmp__add" onClick={agregar}><IconPlus width={18} height={18} /> Agregar otra moto</button>}
          <p className="note-line">Precios públicos de lista con IVA. No incluyen matrícula, SOAT ni seguros.</p>
        </div>
      </section>
    </>
  )
}
