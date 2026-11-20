import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CATEGORIAS, imgMoto, getMoto } from '../data/motos.js'
import { waClick, waLink } from '../data/sitio.js'
import { IconChevron, IconClose, IconMenu, IconMoon, IconPin, IconSearch, IconSun, IconWhatsApp, IconArrow } from './Icons.jsx'
import Logo from './Logo.jsx'
import { useSede } from './SedeProvider.jsx'
import useTheme from '../hooks/useTheme.js'

const NAV = [
  { id: 'inicio', label: 'Inicio', to: '/' },
  { id: 'motos', label: 'Motos', to: '/motocicletas', mega: 'motos' },
  { id: 'comparar', label: 'Comparar', to: '/comparar' },
  { id: 'financiacion', label: 'Financiación', to: '/financia-tu-moto' },
  { id: 'posventa', label: 'Posventa', to: '/posventa' },
  { id: 'concesionario', label: 'Concesionario', to: '/concesionarios' },
  { id: 'contacto', label: 'Contacto', to: '/contacto' },
]

/** Sección activa según la URL (la ficha /motocicletas/:slug cuenta como "Motos"). */
const activa = (path) => {
  if (path === '/') return 'inicio'
  return NAV.find((n) => n.to !== '/' && (path === n.to || path.startsWith(`${n.to}/`)))?.id || null
}

export default function Header() {
  const { sede, sedes, setSede } = useSede()
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [buscar, setBuscar] = useState(false)
  const [q, setQ] = useState('')
  const [acc, setAcc] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [megaTop, setMegaTop] = useState(0)
  const [ind, setInd] = useState({ x: 0, w: 0, on: false })
  const nav = useNavigate()
  const loc = useLocation()
  const inputRef = useRef(null)
  const closeTimer = useRef(null)
  const headRef = useRef(null)
  const ulRef = useRef(null)
  const links = useRef({})
  const actId = activa(loc.pathname)

  // Cierra menús al navegar
  useEffect(() => { setOpen(null); setDrawer(false); setBuscar(false) }, [loc.pathname, loc.hash])
  // Bloquea el scroll del body con el menú móvil abierto
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : '' }, [drawer])
  useEffect(() => { if (buscar) inputRef.current?.focus() }, [buscar])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setDrawer(false); setBuscar(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  // Sombra + compactación del header al hacer scroll (listener pasivo, sin layout thrash)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Indicador deslizante: sigue el hover/foco y vuelve a la sección activa
  const medir = useCallback((id) => {
    const el = links.current[id]; const ul = ulRef.current
    if (!el || !ul) { setInd((p) => ({ ...p, on: false })); return }
    const a = el.getBoundingClientRect(); const b = ul.getBoundingClientRect()
    setInd({ x: a.left - b.left + 8, w: a.width - 16, on: true })
  }, [])
  useLayoutEffect(() => { medir(actId) }, [actId, medir, scrolled])
  useEffect(() => {
    const r = () => medir(actId)
    window.addEventListener('resize', r)
    document.fonts?.ready.then(r)
    return () => window.removeEventListener('resize', r)
  }, [actId, medir])

  const enter = (id, has) => {
    clearTimeout(closeTimer.current); medir(id)
    if (has) { setMegaTop(headRef.current?.getBoundingClientRect().bottom || 0); setOpen(id) }
  }
  const leave = () => { closeTimer.current = setTimeout(() => { setOpen(null); medir(actId) }, 120) }
  const buscarSubmit = (e) => { e.preventDefault(); nav(`/motocicletas${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`) }
  const msg = `Hola, quiero cotizar una moto Honda en ${sede.nombre}.`
  const oscuro = theme === 'dark'

  return (
    <>
      <div className="util">
        <div className="container util__in">
          <span className="util__slogan">Sumoto S.A. · Concesionario Honda · Sueña, hazlo real</span>
          <div className="util__right">
            <label className="sede-select">
              <IconPin width={16} height={16} />
              <span className="sr">Sede</span>
              <select value={sede.id} onChange={(e) => setSede(e.target.value)} aria-label="Selecciona tu sede">
                {sedes.map((s) => <option key={s.id} value={s.id}>{s.ciudad}</option>)}
              </select>
            </label>
            <a className="util__link util__wa" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer"><IconWhatsApp width={16} height={16} /> Habla con un asesor</a>
          </div>
        </div>
      </div>

      <header ref={headRef} className={`head ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container head__in">
          <Logo />
          <nav className="nav" aria-label="Principal">
            <ul ref={ulRef} onMouseLeave={leave}>
              {NAV.map((it) => {
                const has = Boolean(it.mega)
                return (
                  <li key={it.id} className={`nav__item ${open === it.id ? 'is-open' : ''}`}
                    onMouseEnter={() => enter(it.id, has)}>
                    <NavLink ref={(el) => { links.current[it.id] = el }} to={it.to} end={it.id !== 'motos'}
                      className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                      onFocus={() => enter(it.id, has)} onBlur={leave}>
                      {it.label}{has && <IconChevron width={14} height={14} />}
                    </NavLink>
                    {it.mega && open === it.id && (
                      <div className="mega" style={{ top: megaTop }} onMouseEnter={() => enter(it.id, true)}>
                        <div className="container mega__in">
                          {CATEGORIAS.map((cat) => {
                            const m = getMoto(cat.hero)
                            return (
                              <Link key={cat.id} to={`/motocicletas?cat=${cat.id}`} className="mega__cat" onClick={() => setOpen(null)}>
                                <img src={imgMoto(m)} alt="" loading="lazy" />
                                <b>{cat.nombre}</b>
                                <small>{cat.texto}</small>
                              </Link>
                            )
                          })}
                          <Link to="/motocicletas" className="mega__all" onClick={() => setOpen(null)}>
                            <span>Ver todo el catálogo</span><IconArrow />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
              <li className="nav__ind" aria-hidden="true" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.on ? 1 : 0 }} />
            </ul>
          </nav>
          <div className="head__tools">
            <button className="icon-btn" onClick={() => setBuscar((v) => !v)} aria-label="Buscar moto" aria-expanded={buscar}><IconSearch /></button>
            <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label={oscuro ? 'Activar modo claro' : 'Activar modo oscuro'} aria-pressed={oscuro}>
              {oscuro ? <IconSun /> : <IconMoon />}
            </button>
            <button className="icon-btn head__burger" onClick={() => setDrawer(true)} aria-label="Abrir menú" aria-expanded={drawer}><IconMenu /></button>
          </div>
        </div>
        {buscar && (
          <form className="searchbar" onSubmit={buscarSubmit} role="search">
            <div className="container searchbar__in">
              <IconSearch />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca tu moto: CB 190R, Navi, XR…" aria-label="Buscar moto" />
              <button className="btn btn--red" type="submit">Buscar</button>
            </div>
          </form>
        )}
      </header>

      {/* Menú móvil: panel lateral con entrada escalonada de los enlaces */}
      <div className={`drawer ${drawer ? 'is-open' : ''}`} aria-hidden={!drawer}>
        <div className="drawer__scrim" onClick={() => setDrawer(false)} />
        <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="drawer__top">
            <Logo />
            <button className="icon-btn" onClick={() => setDrawer(false)} aria-label="Cerrar menú" tabIndex={drawer ? 0 : -1}><IconClose /></button>
          </div>
          <ul className="drawer__list">
            {NAV.map((it, k) => {
              const subs = it.mega ? CATEGORIAS.map((c) => ({ label: c.nombre, to: `/motocicletas?cat=${c.id}` })) : null
              return (
                <li key={it.id} style={{ '--i': k }}>
                  {subs ? (
                    <>
                      <button className="drawer__row" onClick={() => setAcc(acc === it.id ? null : it.id)} aria-expanded={acc === it.id} tabIndex={drawer ? 0 : -1}>
                        {it.label}<IconChevron className={acc === it.id ? 'rot' : ''} />
                      </button>
                      {acc === it.id && (
                        <div className="drawer__sub">
                          <Link to={it.to}>Ver todo</Link>
                          {subs.map((s) => <Link key={s.label} to={s.to}>{s.label}</Link>)}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link className={`drawer__row ${actId === it.id ? 'is-active' : ''}`} to={it.to} tabIndex={drawer ? 0 : -1}>{it.label}</Link>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="drawer__foot">
            <label className="sede-select sede-select--lg">
              <IconPin width={18} height={18} />
              <select value={sede.id} onChange={(e) => setSede(e.target.value)} aria-label="Selecciona tu sede" tabIndex={drawer ? 0 : -1}>
                {sedes.map((s) => <option key={s.id} value={s.id}>{s.ciudad}</option>)}
              </select>
            </label>
            <a className="btn btn--red btn--block" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer" tabIndex={drawer ? 0 : -1}><IconWhatsApp width={20} height={20} /> Habla con un asesor</a>
          </div>
        </aside>
      </div>
    </>
  )
}
