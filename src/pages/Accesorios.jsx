import Catalogo from './Catalogo.jsx'
import { ACCESORIOS } from '../data/contenido.js'

export default function Accesorios() {
  return (
    <Catalogo tipo="accesorios" titulo="Accesorios" items={ACCESORIOS}
      texto="Cascos, defensas, equipaje, limpieza, seguridad y la ropa oficial Honda Store." />
  )
}
