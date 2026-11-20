import { Link } from 'react-router-dom'
import { ARTICULOS } from '../data/contenido.js'
import { SITIO } from '../data/sitio.js'
import { getMoto, imgMoto } from '../data/motos.js'
import PageHero from '../components/PageHero.jsx'
import { IconArrow, IconExternal } from '../components/Icons.jsx'

export default function HondaTeCuenta() {
  const [principal, ...resto] = ARTICULOS
  return (
    <>
      <PageHero titulo="Honda te cuenta" texto="Noticias Honda, guías de seguridad vial, lanzamientos y tips de mantenimiento." ruta={[{ label: 'Honda te cuenta' }]} />
      <section className="section">
        <div className="container">
          <a className="post post--lead" href={principal.url} target="_blank" rel="noreferrer">
            <div className="post__media"><img src={imgMoto(getMoto(principal.moto))} alt="" loading="lazy" /></div>
            <div className="post__body">
              <span className="post__cat">{principal.categoria}{principal.fecha && ` · ${principal.fecha}`}</span>
              <h2>{principal.titulo}</h2>
              <p>{principal.texto}</p>
              <span className="link-arrow">Leer artículo <IconExternal width={16} height={16} /></span>
            </div>
          </a>
          <div className="grid grid--3 posts">
            {resto.map((a) => (
              <a key={a.titulo} className="post" href={a.url} target="_blank" rel="noreferrer">
                <div className="post__media"><img src={imgMoto(getMoto(a.moto))} alt="" loading="lazy" /></div>
                <div className="post__body">
                  <span className="post__cat">{a.categoria}{a.fecha && ` · ${a.fecha}`}</span>
                  <h3>{a.titulo}</h3>
                  <p>{a.texto}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="more">
            <a className="btn btn--outline" href={SITIO.urls.magazine} target="_blank" rel="noreferrer">Ver más noticias en Honda Magazine <IconExternal width={16} height={16} /></a>
            <Link className="link-arrow" to="/motocicletas">Explorar motos <IconArrow width={18} height={18} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
