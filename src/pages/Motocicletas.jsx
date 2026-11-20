import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIAS, MOTOS, precioDesde } from '../data/motos.js'
import MotoCard from '../components/MotoCard.jsx'
import PageHero from '../components/PageHero.jsx'
import { IconSearch } from '../components/Icons.jsx'

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')

export default function Motocicletas() {
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('cat') || 'todas'
  const q = sp.get('q') || ''
  const orden = sp.get('orden') || 'destacadas'

  const set = (k, v) => {
    const n = new URLSearchParams(sp)
    if (!v || v === 'todas' || v === 'destacadas') n.delete(k); else n.set(k, v)
    setSp(n, { replace: true })
  }

  const lista = useMemo(() => {
    let r = MOTOS.filter((m) => cat === 'todas' || m.categoria === cat)
    if (q.trim()) {
      const nq = norm(q)
      r = r.filter((m) => norm(m.nombre + m.versiones.map((v) => v.nombre).join('')).includes(nq))
    }
    if (orden === 'menor') r = [...r].sort((a, b) => precioDesde(a).precio - precioDesde(b).precio)
    if (orden === 'mayor') r = [...r].sort((a, b) => precioDesde(b).precio - precioDesde(a).precio)
    return r
  }, [cat, q, orden])

  const titulo = cat === 'todas' ? 'Motocicletas Honda' : CATEGORIAS.find((c) => c.id === cat)?.nombre || 'Motocicletas'

  return (
    <>
      <PageHero titulo={titulo} texto="Precios públicos de la lista oficial Honda vigente. Elige tu moto y cotiza con un asesor de tu sede." ruta={[{ label: 'Motocicletas' }]} />
      <section className="section section--tight">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="tablist" aria-label="Categorías">
              <button role="tab" aria-selected={cat === 'todas'} className={`chip ${cat === 'todas' ? 'is-on' : ''}`} onClick={() => set('cat', 'todas')}>Todas <span>{MOTOS.length}</span></button>
              {CATEGORIAS.map((c) => (
                <button key={c.id} role="tab" aria-selected={cat === c.id} className={`chip ${cat === c.id ? 'is-on' : ''}`} onClick={() => set('cat', c.id)}>
                  {c.nombre} <span>{MOTOS.filter((m) => m.categoria === c.id).length}</span>
                </button>
              ))}
            </div>
            <div className="toolbar__right">
              <label className="searchbox">
                <IconSearch width={18} height={18} />
                <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Buscar modelo" aria-label="Buscar modelo" />
              </label>
              <label className="select">
                <span className="sr">Ordenar</span>
                <select value={orden} onChange={(e) => set('orden', e.target.value)} aria-label="Ordenar por">
                  <option value="destacadas">Orden sugerido</option>
                  <option value="menor">Precio: menor a mayor</option>
                  <option value="mayor">Precio: mayor a menor</option>
                </select>
              </label>
            </div>
          </div>
          <p className="count" aria-live="polite">{lista.length} {lista.length === 1 ? 'moto' : 'motos'}</p>
          {lista.length ? (
            <div className="grid grid--4">{lista.map((m) => <MotoCard key={m.slug} moto={m} />)}</div>
          ) : (
            <div className="empty">
              <h2>No encontramos motos con ese filtro</h2>
              <p>Prueba con otro nombre o quita la categoría seleccionada.</p>
              <button className="btn btn--red" onClick={() => setSp({}, { replace: true })}>Ver todo el catálogo</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
