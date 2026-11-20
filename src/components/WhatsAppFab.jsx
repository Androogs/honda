import { waClick, waLink } from '../data/sitio.js'
import { IconWhatsApp } from './Icons.jsx'

export default function WhatsAppFab() {
  const msg = 'Hola, quiero información sobre las motos Honda de Sumoto.'
  return (
    <a className="fab" href={waLink(msg)} onClick={waClick(msg)} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
      <IconWhatsApp width={30} height={30} />
    </a>
  )
}
