import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * SCROLL REVEAL (Intersection Observer)
 * Marca automáticamente los bloques de contenido con data-reveal y los revela con fade-up
 * escalonado (stagger) cuando entran al viewport. No toca el JSX de cada página:
 * si quieres revelar otro elemento, añade su selector a SELECTORES.
 * Solo anima opacity/transform (compositor) → sin layout shift. Respeta prefers-reduced-motion.
 */
const SELECTORES = [
  '.sec-head', '.mcard', '.cat', '.shortcut', '.tile', '.post', '.stepcards li', '.panel', '.fcard',
  '.channel', '.faq__item', '.sede', '.sedes__info', '.map', '.sim', '.fin__side > *', '.visit',
  '.cmp__wrap', '.features li', '.pdp__stage', '.pdp__info > *', '.kpis > div', '.acc details',
  '.pending', '.empty', '.steps li', '.note-line', '.more', '.toolbar',
].join(',')

export default function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return undefined

    const main = document.getElementById('contenido')
    if (!main) return undefined

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })

    const marcar = (root) => {
      const nodos = root.querySelectorAll(SELECTORES)
      // stagger: el índice se calcula entre hermanos para que las rejillas entren en cascada
      nodos.forEach((el) => {
        if (el.closest('.hero') || el.hasAttribute('data-in')) return
        if (!el.hasAttribute('data-reveal')) {
          const i = Array.prototype.indexOf.call(el.parentElement?.children || [], el)
          el.style.setProperty('--rv', `${Math.min(Math.max(i, 0), 8) * 70}ms`)
          el.setAttribute('data-reveal', '')
        }
        // observe() es idempotente: re-adjunta elementos que quedaron huérfanos
        // al desconectarse un observer anterior (remontaje de StrictMode / HMR)
        io.observe(el)
      })
    }

    marcar(main)
    // contenido que aparece después (filtros, pestañas, resultados)
    let raf = 0
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => marcar(main)) })
    mo.observe(main, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf) }
  }, [pathname])
}
