import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cop, getMoto, imgMoto, precioDesde } from '../data/motos.js'
import { waClick, waLink } from '../data/sitio.js'
import { IconArrow, IconCaretLeft, IconCaretRight, IconPause, IconPlaySolid, IconWhatsApp } from './Icons.jsx'
import { useSede } from './SedeProvider.jsx'

/**
 * HERO + CARRUSEL DE BANNERS
 * ─────────────────────────────────────────────────────────────────────────────
 * Cada slide mantiene el texto y la moto que ya existían en el sitio. Las diapositivas con `banner`
 * usan las fotografías nuevas de /public/banners/<slug>-1280|1920.webp (convertidas de los JPG enviados).
 *
 *   banner  → slug del archivo en /public/banners (null = usa el recorte de la moto sobre fondo de marca)
 *   lado    → lado donde va el texto ('izq' | 'der'), elegido para no tapar al motociclista del banner
 *   foco    → object-position del banner (qué parte de la foto se conserva al recortar en móvil)
 *
 * Para añadir un banner nuevo: copia la imagen a /public/banners como <slug>-1280.webp y <slug>-1920.webp
 * y agrega un objeto a SLIDES.
 */
const SLIDES = [
  // BANNER NUEVO (CB300F-Desk.jpg) – reemplaza el recorte de la CB 300F
  { slug: 'cb-300f', kicker: 'Nueva · Sport', titulo: 'CB 300F', texto: 'Estilo puro a donde quiera que vayas.', banner: 'cb-300f', lado: 'der', foco: '30% 50%' },
  // BANNER NUEVO (cb190r-Desk.jpg) – reemplaza el recorte de la CB 190R 2.0
  { slug: 'cb-190r', kicker: 'Nueva · Sport', titulo: 'CB 190R 2.0', texto: 'Tu mundo cambia. ABS, control de tracción y tablero TFT.', banner: 'cb-190r', lado: 'der', foco: '38% 50%' },
  // BANNER NUEVO (NX190-Desk.jpg) – slide adicional con la NX 190 (texto tomado de data/motos.js)
  { slug: 'nx-190', kicker: 'Nueva · Sport', titulo: 'NX 190', texto: null, banner: 'nx-190', lado: 'der', foco: '34% 50%' },
  // BANNER NUEVO (Hornet125-Desk.jpg) – slide adicional con la CB 125 Hornet (texto tomado de data/motos.js)
  { slug: 'cb-125-hornet', kicker: 'Nueva · Sport', titulo: 'CB 125 Hornet', texto: null, banner: 'cb-125-hornet', lado: 'der', foco: '36% 50%' },
  // PLACEHOLDER: sin banner todavía → conserva el recorte original de la moto. Cuando tengas la foto, agrega banner: 'xr-190l'
  { slug: 'xr-190l', kicker: 'Nueva · Todo terreno', titulo: 'XR 190L 2.0', texto: 'Más ruta, más aventura.', banner: null, lado: 'izq' },
  // PLACEHOLDER: sin banner todavía → conserva el recorte original de la moto.
  { slug: 'navi', kicker: 'Navi', titulo: 'Navi', texto: 'Diversión compacta para moverte por la ciudad.', banner: null, lado: 'izq' },
]
const MS = 6500 // duración de cada slide (la barra de progreso CSS usa el mismo valor)

export default function HeroCarousel() {
  const { sede } = useSede()
  const n = SLIDES.length
  const [i, setI] = useState(0)
  const [play, setPlay] = useState(true) // pausa manual (botón)
  const [hover, setHover] = useState(false) // pausa temporal (hover / foco / toque)
  const root = useRef(null)
  const drag = useRef(null)
  const paused = !play || hover

  const ir = useCallback((k) => setI(((k % n) + n) % n), [n])
  const sig = useCallback(() => ir(i + 1), [i, ir])
  const ant = useCallback(() => ir(i - 1), [i, ir])

  // Teclado: ← → cuando el foco está dentro del carrusel
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); sig() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ant() }
  }
  // Swipe en móvil (Pointer Events: funciona con touch, lápiz y mouse)
  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY } }
  const up = (e) => {
    const d = drag.current; drag.current = null
    if (!d) return
    const dx = e.clientX - d.x; const dy = e.clientY - d.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? sig : ant)()
  }
  // Precarga la siguiente imagen para que la transición no parpadee
  useEffect(() => {
    const s = SLIDES[(i + 1) % n]
    if (s.banner) { const im = new Image(); im.src = `/banners/${s.banner}-1920.webp` }
  }, [i, n])

  return (
    <section ref={root} className="hero" aria-roledescription="carrusel" aria-label="Motos destacadas"
      onKeyDown={onKey}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={(e) => { if (!root.current.contains(e.relatedTarget)) setHover(false) }}>
      <div className="hero__stack" onPointerDown={down} onPointerUp={up} onPointerCancel={() => { drag.current = null }}
        aria-live={paused ? 'polite' : 'off'}>
        {SLIDES.map((s, k) => {
          const m = getMoto(s.slug)
          const d = precioDesde(m)
          const activo = k === i
          const msg = `Hola, quiero cotizar la ${m.nombre} en ${sede.nombre}.`
          const texto = s.texto || m.lema
          return (
            <article key={s.slug} className={`hslide hslide--${s.lado} ${s.banner ? 'hslide--banner' : 'hslide--cutout'} ${activo ? 'is-on' : ''}`}
              aria-hidden={!activo} role="group" aria-roledescription="diapositiva" aria-label={`${k + 1} de ${n}: ${s.titulo}`}>
              <div className="hslide__media" aria-hidden="true">
                {s.banner ? (
                  <img className="hslide__img" src={`/banners/${s.banner}-1280.webp`}
                    srcSet={`/banners/${s.banner}-1280.webp 1280w, /banners/${s.banner}-1920.webp 1920w`}
                    sizes="100vw" width="1920" height="917" alt="" style={{ objectPosition: s.foco }}
                    loading={k === 0 ? 'eager' : 'lazy'} fetchPriority={k === 0 ? 'high' : 'auto'} decoding="async" />
                ) : (
                  <>
                    <span className="hslide__ghost">{s.titulo}</span>
                    <img className="hslide__cutout" src={imgMoto(m)} alt="" loading="lazy" decoding="async" />
                  </>
                )}
              </div>
              <div className="hslide__overlay" aria-hidden="true" />
              <div className="container hslide__in">
                <div className="hslide__copy">
                  <span className="hslide__kicker">{s.kicker}</span>
                  {k === 0 ? <h1 className="hslide__title">{s.titulo}</h1> : <h2 className="hslide__title">{s.titulo}</h2>}
                  <p className="hslide__text">{texto}</p>
                  <p className="hslide__price"><small>Desde · modelo {d.anio}</small><strong>{cop(d.precio)}</strong></p>
                  <div className="hslide__cta">
                    <a className="btn btn--red btn--lg" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer" tabIndex={activo ? 0 : -1}>
                      <IconWhatsApp width={20} height={20} /> Cotizar
                    </a>
                    <Link className="btn btn--outline-light btn--lg" to={`/motocicletas/${m.slug}`} tabIndex={activo ? 0 : -1}>
                      Ver moto <IconArrow width={20} height={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="hero__ctrl">
        <div className="container hero__ctrl-in">
          <div className="hero__dots" role="tablist" aria-label="Seleccionar diapositiva">
            {SLIDES.map((s, k) => (
              <button key={s.slug} role="tab" aria-selected={k === i} aria-label={`${k + 1}: ${s.titulo}`}
                className={k === i ? 'is-on' : ''} onClick={() => ir(k)}>
                {/* La barra se llena durante MS ms; al terminar (animationend) avanza al siguiente slide. */}
                {k === i && <i key={`${i}-${play}`} style={{ '--ms': `${MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} onAnimationEnd={sig} />}
              </button>
            ))}
          </div>
          <div className="hero__arrows">
            <button className="icon-btn icon-btn--glass" onClick={() => setPlay((p) => !p)} aria-label={play ? 'Pausar carrusel' : 'Reanudar carrusel'} aria-pressed={!play}>
              {play ? <IconPause size={20} /> : <IconPlaySolid size={20} />}
            </button>
            <button className="icon-btn icon-btn--glass" onClick={ant} aria-label="Diapositiva anterior"><IconCaretLeft size={20} /></button>
            <button className="icon-btn icon-btn--glass" onClick={sig} aria-label="Diapositiva siguiente"><IconCaretRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
