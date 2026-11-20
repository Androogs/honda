import { Link } from 'react-router-dom'

export default function PageHero({ titulo, texto, ruta = [], children }) {
  return (
    <header className="phero">
      <div className="container phero__in">
        <nav className="crumbs" aria-label="Ruta">
          <Link to="/">Inicio</Link>
          {ruta.map((r) => (r.to ? <Link key={r.label} to={r.to}>{r.label}</Link> : <span key={r.label} aria-current="page">{r.label}</span>))}
        </nav>
        <h1 className="phero__title">{titulo}</h1>
        {texto && <p className="phero__text">{texto}</p>}
        {children}
      </div>
    </header>
  )
}
