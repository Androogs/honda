import Catalogo from './Catalogo.jsx'
import { REPUESTOS } from '../data/contenido.js'
import { SITIO } from '../data/sitio.js'
import { IconExternal } from '../components/Icons.jsx'

export default function Repuestos() {
  return (
    <Catalogo tipo="repuestos" titulo="Repuestos" items={REPUESTOS}
      texto="Baterías, llantas, lubricantes Pro Honda y repuestos originales para mantener tu moto como el primer día."
      extra={<a className="link-arrow" href={SITIO.urls.vin} target="_blank" rel="noreferrer">Buscar repuestos por código VIN <IconExternal width={16} height={16} /></a>} />
  )
}
