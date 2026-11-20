import { useCallback, useEffect, useState } from 'react'

/** Tema claro/oscuro: respeta la preferencia del sistema y recuerda la elección del usuario. */
const KEY = 'honda-theme'
const leer = () => {
  try { const s = localStorage.getItem(KEY); if (s === 'dark' || s === 'light') return s } catch { /* ignorar */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => (typeof document !== 'undefined' && document.documentElement.dataset.theme) || leer())
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c0d10' : '#cc0000')
  }, [theme])
  const toggle = useCallback(() => {
    setTheme((t) => {
      const n = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(KEY, n) } catch { /* ignorar */ }
      return n
    })
  }, [])
  return [theme, toggle]
}
