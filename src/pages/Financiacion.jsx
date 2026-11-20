import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIAS, MOTOS, aniosDe, cop, getMoto, precioDe } from '../data/motos.js'
import { FINANCIERAS } from '../data/contenido.js'
import { SITIO, waClick, waLink } from '../data/sitio.js'
import { useSede } from '../components/SedeProvider.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconCard, IconExternal, IconWhatsApp } from '../components/Icons.jsx'

const PLAZOS = [12, 24, 36, 48, 60]

export default function Financiacion() {
  const { sede } = useSede()
  const [sp] = useSearchParams()
  const inicial = getMoto(sp.get('moto')) || MOTOS.find((m) => m.slug === 'cb-125f')
  const [slug, setSlug] = useState(inicial.slug)
  const [verId, setVerId] = useState(inicial.versiones[0].id)
  const [pct, setPct] = useState(20)
  const [plazo, setPlazo] = useState(36)
  const [tasa, setTasa] = useState(SITIO.tasaMensual != null ? String(SITIO.tasaMensual).replace('.', ',') : '')

  const moto = getMoto(slug)
  const ver = moto.versiones.find((v) => v.id === verId) || moto.versiones[0]
  const anio = aniosDe(ver)[0]
  const precio = precioDe(ver, anio)

  const r = useMemo(() => {
    const inicialVal = Math.round((precio * pct) / 100)
    const monto = precio - inicialVal
    const i = parseFloat(String(tasa).replace(',', '.')) / 100
    if (!i || i <= 0 || i > 0.2) return { inicialVal, monto, cuota: null }
    const cuota = (monto * i) / (1 - Math.pow(1 + i, -plazo))
    return { inicialVal, monto, cuota, total: cuota * plazo }
  }, [precio, pct, plazo, tasa])

  const cambiaMoto = (s) => { setSlug(s); setVerId(getMoto(s).versiones[0].id) }
  const msg = `Hola, quiero financiar la Honda ${ver.nombre} (${cop(precio)}). Cuota inicial ${pct}% (${cop(r.inicialVal)}), plazo ${plazo} meses${r.cuota ? `, cuota estimada ${cop(Math.round(r.cuota))} con tasa ${tasa}% mensual` : ''}. Sede ${sede.nombre}.`

  return (
    <>
      <PageHero titulo="Financia tu moto" texto="Tu moto más cerca de lo que imaginas. Simula tu cuota y conoce las financieras aliadas de Honda." ruta={[{ label: 'Financia tu moto' }]} />
      <section className="section">
        <div className="container fin">
          <div className="sim">
            <h2><IconCard width={26} height={26} /> Simulador de crédito</h2>
            <div className="sim__grid">
              <label className="field">
                <span>Moto</span>
                <select value={slug} onChange={(e) => cambiaMoto(e.target.value)}>
                  {CATEGORIAS.map((c) => (
                    <optgroup key={c.id} label={c.nombre}>
                      {MOTOS.filter((m) => m.categoria === c.id).map((m) => <option key={m.slug} value={m.slug}>{m.nombre}</option>)}
                    </optgroup>
                  ))}
                </select>
              </label>
              {moto.versiones.length > 1 && (
                <label className="field">
                  <span>Versión</span>
                  <select value={ver.id} onChange={(e) => setVerId(e.target.value)}>
                    {moto.versiones.map((v) => <option key={v.id} value={v.id}>{v.nombre}</option>)}
                  </select>
                </label>
              )}
              <label className="field">
                <span>Cuota inicial: <b>{pct}%</b> · {cop(r.inicialVal)}</span>
                <input type="range" min="0" max="60" step="5" value={pct} onChange={(e) => setPct(+e.target.value)} />
              </label>
              <label className="field">
                <span>Plazo</span>
                <select value={plazo} onChange={(e) => setPlazo(+e.target.value)}>
                  {PLAZOS.map((p) => <option key={p} value={p}>{p} meses</option>)}
                </select>
              </label>
              <label className="field">
                <span>Tasa mensual (% N.M.)</span>
                <input inputMode="decimal" placeholder="Ej. 1,9" value={tasa} onChange={(e) => setTasa(e.target.value)} />
              </label>
            </div>
            <div className="sim__out">
              <div><small>Precio de la moto · modelo {anio}</small><b>{cop(precio)}</b></div>
              <div><small>Valor a financiar</small><b>{cop(r.monto)}</b></div>
              <div className="sim__quota">
                <small>Cuota mensual estimada</small>
                <b>{r.cuota ? cop(Math.round(r.cuota)) : '—'}</b>
                {!r.cuota && <em>Escribe la tasa de tu cotización para ver la cuota.</em>}
              </div>
            </div>
            <p className="fine">Simulación informativa sin seguros ni costos adicionales. La aprobación, la tasa y las condiciones finales las define la entidad financiera. Precio público con IVA, sujeto a cambio.</p>
            <a className="btn btn--red btn--lg" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer"><IconWhatsApp width={20} height={20} /> Solicitar crédito con un asesor</a>
          </div>

          <div className="fin__side">
            <h2>Financieras aliadas</h2>
            {FINANCIERAS.map((f) => (
              <article key={f.id} className="fcard">
                <h3>{f.nombre}</h3>
                <p>{f.texto}</p>
                <a className="link-arrow" href={f.url} target="_blank" rel="noreferrer">Conocer más <IconExternal width={16} height={16} /></a>
              </article>
            ))}
            <ol className="steps">
              <li><b>Elige</b> tu moto y color.</li>
              <li><b>Simula</b> tu cuota con cuota inicial y plazo.</li>
              <li><b>Solicita</b> tu estudio con un asesor de {sede.ciudad.split(',')[0]}.</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
