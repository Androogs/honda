import { Link } from 'react-router-dom'
import { CATEGORIAS, MOTOS, getMoto, imgMoto, motosDe } from '../data/motos.js'
import MotoCard from '../components/MotoCard.jsx'
import { IconArrow, IconCard, IconShield, IconWrench } from '../components/Icons.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'

const DESTACADAS = ['cb-125f', 'xblade-160', 'xr-150l', 'dio-led-dlx']

export default function Inicio() {
  return (
    <>
      {/* HERO + CARRUSEL DE BANNERS (ver components/HeroCarousel.jsx) */}
      <HeroCarousel />

      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2>Elige tu categoría</h2>
            <Link to="/motocicletas" className="link-arrow">Ver todas las motos <IconArrow width={18} height={18} /></Link>
          </div>
          <div className="cats">
            {CATEGORIAS.map((c) => {
              const m = getMoto(c.hero)
              return (
                <Link key={c.id} to={`/motocicletas?cat=${c.id}`} className="cat">
                  <img src={imgMoto(m)} alt="" loading="lazy" />
                  <div>
                    <h3>{c.nombre}</h3>
                    <p>{motosDe(c.id).length} modelos</p>
                  </div>
                  <IconArrow className="cat__arrow" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2>Compra tu moto Honda</h2>
              <p className="sec-sub">Sueña, hazlo real. Modelos destacados con precio público de lista.</p>
            </div>
            <Link to="/motocicletas" className="link-arrow">Catálogo completo ({MOTOS.length}) <IconArrow width={18} height={18} /></Link>
          </div>
          <div className="grid grid--4">
            {DESTACADAS.map((s) => <MotoCard key={s} moto={getMoto(s)} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container shortcuts">
          <Link to="/financia-tu-moto" className="shortcut shortcut--red">
            <IconCard width={34} height={34} />
            <h3>Financia tu moto</h3>
            <p>Simula tu cuota y conoce las financieras aliadas de Honda.</p>
            <span>Simular ahora <IconArrow width={18} height={18} /></span>
          </Link>
          <Link to="/posventa" className="shortcut shortcut--ink">
            <IconWrench width={34} height={34} />
            <h3>Posventa</h3>
            <p>Taller, repuestos originales, accesorios y campañas de seguridad.</p>
            <span>Explorar <IconArrow width={18} height={18} /></span>
          </Link>
          <Link to="/comparar" className="shortcut shortcut--line">
            <IconShield width={34} height={34} />
            <h3>Comparar motos</h3>
            <p>Compara precios, versiones y colores lado a lado.</p>
            <span>Comparar <IconArrow width={18} height={18} /></span>
          </Link>
        </div>
      </section>
    </>
  )
}
