import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <section className="section">
      <div className="container empty">
        <h1>Esta página no existe</h1>
        <p>Es posible que el enlace haya cambiado. Vuelve al inicio o revisa el catálogo.</p>
        <div className="empty__cta">
          <Link className="btn btn--red" to="/">Ir al inicio</Link>
          <Link className="btn btn--outline" to="/motocicletas">Ver motocicletas</Link>
        </div>
      </div>
    </section>
  )
}
