import { Link } from 'react-router-dom'

/**
 * Logo Honda + Sumoto.
 * Se renderizan las dos versiones del logo Sumoto (oscura / clara) y el CSS muestra
 * la correcta según el tema (claro/oscuro) o según la prop `light` (footer, fondos oscuros).
 */
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Honda Sumoto – Inicio">
      <img className="logo__honda" src="/brand/Honda_logo.png" alt="Honda" width="56" height="56" />
      <span className="logo__dealer">
        <img className="logo__sumoto logo__sumoto--dark" src="/brand/logo-sumoto.png" alt="Sumoto" width="179" height="24" />
        <img className="logo__sumoto logo__sumoto--light" src="/brand/logo-sumoto-light.png" alt="" aria-hidden="true" width="179" height="24" />
      </span>
    </Link>
  )
}
