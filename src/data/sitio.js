/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DEL SITIO – Edita aquí los datos del concesionario.
 *  Todo lo marcado con  // PENDIENTE  debe confirmarse antes de publicar.
 * ─────────────────────────────────────────────────────────────
 */
export const SITIO = {
  empresa: 'SUMOTO S.A.',
  marca: 'Honda',
  eslogan: 'Concesionario Honda en el Valle del Cauca',
  email: 'comercial2@sumoto.com.co', // PENDIENTE: confirmar correo comercial de Honda
  // PENDIENTE: confirmar horarios reales de cada sede
  horarios: [
    { dias: 'Lunes a viernes', horas: '8:30 a. m. - 12:00 p. m. / 2:00 p. m. - 6:00 p. m.' },
    { dias: 'Sábados', horas: '8:30 a. m. - 1:00 p. m.' },
    { dias: 'Domingos y festivos', horas: 'Cerrado' },
  ],
  // PENDIENTE: reemplazar por las redes propias de Sumoto Honda si existen
  redes: {
    facebook: 'https://www.facebook.com/hondacolombia/',
    instagram: 'https://www.instagram.com/hondamotoscol/',
    youtube: 'https://www.youtube.com/user/HondaColombia',
  },
  // Líneas nacionales publicadas por Honda Colombia
  lineasHonda: [
    { ciudad: 'Cali', label: '602 347 2225', tel: '+576023472225' },
    { ciudad: 'Bogotá', label: '601 745 9036', tel: '+576017459036' },
    { ciudad: 'Medellín', label: '604 520 2891', tel: '+576045202891' },
  ],
  // Tasa mensual de referencia para el simulador (en %). Mientras sea null el cliente la escribe a mano.
  tasaMensual: null, // PENDIENTE: confirmar con Progreser / Sufi
  urls: {
    marca: 'https://motos.honda.com.co/',
    tienda: 'https://tienda.honda.com.co/',
    catalogo: 'https://motos.honda.com.co/motos-honda',
    concesionarios: 'https://motos.honda.com.co/concesionarios',
    magazine: 'https://motos.honda.com.co/magazine',
    liveStore: 'https://motos.honda.com.co/live-store',
    campanas: 'https://motos.honda.com.co/campanas-seguridad',
    financiacionProgreser: 'https://motos.honda.com.co/financiacion-motos',
    financiacionSufi: 'https://motos.honda.com.co/financiacion-motos-sufi',
    vin: 'https://tienda.honda.com.co/repuestos/repuestos-originales-honda?showVINSearchForm=true',
    privacidad: 'https://motos.honda.com.co/politicas-tratamiento-datos',
    terminos: 'https://motos.honda.com.co/terminos-y-condiciones',
  },
}

/**
 * SEDES – cada sede tiene asesores de ventas (rotan por turnos) y un número de taller/repuestos.
 * Si un número está vacío ('') el botón de WhatsApp abre WhatsApp con el mensaje listo, sin destinatario fijo.
 * Formato de número WhatsApp: código de país + número, sin signos. Ej: 573001234567
 */
export const SEDES = {
  florida: {
    id: 'florida',
    nombre: 'Sumoto Honda Florida',
    ciudad: 'Florida, Valle del Cauca',
    direccion: '', // PENDIENTE
    mapaQuery: 'Florida, Valle del Cauca',
    mapaUrl: '', // PENDIENTE: enlace de Google Maps de la sede
    asesores: [{ label: '+57 318 716 8811', wa: '573187168811' }],
    taller: { label: '+57 310 231 5565', wa: '573102315565' },
    repuestos: { label: '+57 310 231 5565', wa: '573102315565' },
  },
}

/* ───────────────────────── Lógica de sede y WhatsApp ───────────────────────── */
const SEDE_KEY = 'honda-sede'
let activa = 'florida'
const turnos = {}

export const getSavedSedeId = () => {
  try {
    const id = window.localStorage.getItem(SEDE_KEY)
    if (id && SEDES[id]) { activa = id; return id }
  } catch { /* sin almacenamiento disponible */ }
  return 'florida'
}
export const saveSedeId = (id) => {
  if (!SEDES[id]) return
  activa = id
  try { window.localStorage.setItem(SEDE_KEY, id) } catch { /* ignorar */ }
}
export const getSede = (id = activa) => SEDES[id] || SEDES.florida

export const waLink = (mensaje = '', numero = '') =>
  `https://wa.me/${numero || ''}?text=${encodeURIComponent(mensaje)}`

/** Devuelve el siguiente asesor de la sede activa (rotación) o el número de taller/repuestos. */
export const siguienteWa = (tipo = 'asesor') => {
  const s = getSede()
  if (tipo === 'taller' || tipo === 'repuestos') return s[tipo].wa
  const lista = s.asesores
  const key = `honda-turno-${s.id}`
  let i = turnos[s.id] || 0
  try {
    const g = window.localStorage.getItem(key)
    if (g !== null && Number.isInteger(+g) && +g >= 0 && +g < lista.length) i = +g
    window.localStorage.setItem(key, String((i + 1) % lista.length))
  } catch { /* ignorar */ }
  turnos[s.id] = (i + 1) % lista.length
  return lista[i].wa
}
/** onClick para <a>: calcula el destino de WhatsApp en el momento del clic. */
export const waClick = (mensaje = '', tipo = 'asesor') => (e) => {
  e.currentTarget.href = waLink(mensaje, siguienteWa(tipo))
}
