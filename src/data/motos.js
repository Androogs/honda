/**
 * ─────────────────────────────────────────────────────────────
 *  CATÁLOGO DE MOTOCICLETAS HONDA – SUMOTO S.A.
 *
 *  FUENTE DE PRECIOS: "Lista oficial de precios distribuidores motocicletas Honda – Plana",
 *  vigente desde el 1 de octubre de 2026 (columna PRECIO PÚBLICO CON IVA).
 *  ⚠ Solo se publican precios públicos. Los descuentos de distribuidor (crédito / contado)
 *    son información interna y NO deben incorporarse a este archivo.
 *
 *  Para actualizar un precio: edita el número en `precios` (por año modelo).
 *  Para agregar una moto: copia un bloque, cambia el slug, crea la carpeta
 *  public/motos/<slug>/ y deja una imagen <color-id>.webp por cada color.
 * ─────────────────────────────────────────────────────────────
 */

export const CATEGORIAS = [
  { id: 'sport', nombre: 'Sport', slug: 'sport', texto: 'Deportivas y urbanas para el día a día.', hero: 'cb-300f' },
  { id: 'todo-terreno', nombre: 'Todo terreno', slug: 'todo-terreno', texto: 'Para salir del asfalto y ampliar tus rutas.', hero: 'xr-190l' },
  { id: 'scooter-semiautomatica', nombre: 'Scooter y semiautomática', slug: 'scooter-semiautomatica', texto: 'Cómodas y fáciles de manejar.', hero: 'pcx-160-abs' },
  { id: 'navi', nombre: 'Navi', slug: 'navi', texto: 'Compacta, divertida y con mucha personalidad.', hero: 'navi-rally' },
]

const R = '#cc0000'
const colores = {
  rojo: { nombre: 'Rojo', swatch: R },
  negro: { nombre: 'Negro', swatch: '#1a1a1c' },
  blanco: { nombre: 'Blanco', swatch: '#f4f4f2' },
  gris: { nombre: 'Gris', swatch: '#8b8f94' },
  azul: { nombre: 'Azul', swatch: '#1f4fa3' },
  amarillo: { nombre: 'Amarillo', swatch: '#e6d400' },
  beige: { nombre: 'Beige', swatch: '#c9b79a' },
}
const c = (id, key, nombre) => ({ id, nombre: nombre || colores[key].nombre, swatch: colores[key].swatch })

export const MOTOS = [
  // ───────────────────────── SPORT ─────────────────────────
  {
    slug: 'cb-300f', nombre: 'CB 300F', categoria: 'sport', nueva: true, consumo: true,
    lema: 'Estilo naked con carácter premium',
    versiones: [{ id: 'std', nombre: 'CB 300F', precios: { 2027: 16800000 } }],
    colores: [c('rojo', 'rojo'), c('gris', 'gris', 'Gris mate'), c('azul', 'azul', 'Azul mate')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-300F',
  },
  {
    slug: 'cb-190r', nombre: 'CB 190R 2.0', categoria: 'sport', nueva: true,
    lema: 'Tu mundo cambia',
    versiones: [{ id: 'std', nombre: 'CB 190R 2.0 2CH', precios: { 2026: 12690000, 2027: 12790000 } }],
    colores: [c('rojo', 'rojo'), c('gris', 'gris')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-190-R-20',
  },
  {
    slug: 'nx-190', nombre: 'NX 190', categoria: 'sport', nueva: true,
    lema: 'Aventura urbana de doble propósito',
    versiones: [{ id: 'std', nombre: 'NX 190 2CH', precios: { 2026: 14590000, 2027: 14690000 } }],
    colores: [c('rojo', 'rojo'), c('negro', 'negro')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/NX-190',
  },
  {
    slug: 'xblade-160', nombre: 'X-Blade 160', categoria: 'sport',
    lema: 'Diseño afilado, actitud sport',
    versiones: [{ id: 'std', nombre: 'XBLADE 160', precios: { 2026: 10190000, 2027: 10290000 } }],
    colores: [c('rojo', 'rojo'), c('gris', 'gris'), c('beige', 'beige')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/XBLADE-160',
  },
  {
    slug: 'cb-125-hornet', nombre: 'CB 125 Hornet', categoria: 'sport', nueva: true,
    lema: 'La Hornet llega con ADN deportivo',
    versiones: [{ id: 'std', nombre: 'CB125 HORNET', precios: { 2027: 8290000 } }],
    colores: [c('amarillo', 'amarillo'), c('azul', 'azul'), c('negro', 'negro'), c('rojo', 'rojo')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-125-Hornet',
  },
  {
    slug: 'cb-125f-dlx', nombre: 'CB 125F DLX', categoria: 'sport', nueva: true,
    lema: 'La versión DLX de la 125F',
    versiones: [
      { id: 'dlx', nombre: 'CB125F DLX 2.0', precios: { 2026: 6950000, 2027: 7050000 } },
      { id: 'dlx-max', nombre: 'CB125F DLX 2.0 MAX', precios: { 2026: 7000000, 2027: 7100000 } },
    ],
    colores: [c('rojo', 'rojo'), c('gris', 'gris')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-125F-DLX-20',
  },
  {
    slug: 'cb-125f', nombre: 'CB 125F', categoria: 'sport', nueva: true,
    lema: 'Eficiente y confiable para todos los días',
    versiones: [
      { id: 'std', nombre: 'CB125F 2.0', precios: { 2026: 6790000, 2027: 6890000 } },
      { id: 'max', nombre: 'CB125F 2.0 MAX', precios: { 2026: 6930000, 2027: 7030000 } },
    ],
    colores: [c('rojo', 'rojo'), c('negro', 'negro')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-125F-STD-20',
  },
  {
    slug: 'cb-100', nombre: 'CB 100', categoria: 'sport', nueva: true,
    lema: 'La Honda más accesible de la gama sport',
    versiones: [
      { id: 'cb100', nombre: 'CB100', precios: { 2026: 5500000 } },
      { id: 'cb100-20', nombre: 'CB100 2.0', precios: { 2027: 5500000 } },
    ],
    colores: [c('roja', 'rojo'), c('gris', 'gris'), c('azul', 'azul')],
    oficial: 'https://motos.honda.com.co/motos-honda/motos-sport/CB-100',
  },

  // ───────────────────────── TODO TERRENO ─────────────────────────
  {
    slug: 'xr-300l-tornado', nombre: 'XR 300L Tornado', categoria: 'todo-terreno', nueva: true, consumo: true,
    lema: 'La Tornado de mayor cilindraje de la línea',
    versiones: [{ id: 'std', nombre: 'XR300L TORNADO', precios: { 2027: 30490000 } }],
    colores: [c('roja', 'rojo'), c('gris', 'gris'), c('blanco', 'blanco')],
    oficial: 'https://motos.honda.com.co/motos-honda/todo-terreno/XR-300-tornado',
  },
  {
    slug: 'xr-190l', nombre: 'XR 190L 2.0', categoria: 'todo-terreno', nueva: true,
    lema: 'Más ruta, más aventura',
    versiones: [{ id: 'std', nombre: 'XR190L 2.0', precios: { 2026: 13800000, 2027: 13900000 } }],
    colores: [c('rojo', 'rojo'), c('blanca', 'blanco'), c('beige', 'beige')],
    oficial: 'https://motos.honda.com.co/motos-honda/todo-terreno/XR-190L-20',
  },
  {
    slug: 'xr-150l', nombre: 'XR 150L 2.0', categoria: 'todo-terreno', nueva: true,
    lema: 'Todoterreno para empezar la aventura',
    versiones: [{ id: 'std', nombre: 'XR 150L 2.0', precios: { 2026: 10450000, 2027: 10590000 } }],
    colores: [c('rojo', 'rojo'), c('negro', 'negro'), c('blanco', 'blanco')],
    oficial: 'https://motos.honda.com.co/motos-honda/todo-terreno/XR-150L-20',
  },

  // ───────────────────────── SCOOTER Y SEMIAUTOMÁTICA ─────────────────────────
  {
    slug: 'pcx-160-abs', nombre: 'PCX 160 ABS', categoria: 'scooter-semiautomatica',
    lema: 'Muévete a tu ritmo',
    versiones: [
      { id: 'abs', nombre: 'PCX160 ABS', precios: { 2026: 14800000, 2027: 14800000 } },
      { id: 'fp', nombre: 'PCX 160 FP', precios: { 2026: 14800000 } },
    ],
    colores: [c('blanca', 'blanco'), c('roja', 'rojo'), c('azul', 'azul')],
    oficial: 'https://motos.honda.com.co/motos-honda',
  },
  {
    slug: 'dio-led-dlx', nombre: 'DIO LED DLX', categoria: 'scooter-semiautomatica',
    lema: 'Scooter ágil para la ciudad',
    versiones: [{ id: 'std', nombre: 'DIO DLX 110', precios: { 2026: 7340000, 2027: 7540000 } }],
    colores: [c('gris', 'gris')],
    oficial: 'https://motos.honda.com.co/motos-honda/scooter-y-semiautomatica/DIO-LED-DLX',
  },
  {
    slug: 'dio-led-std', nombre: 'DIO LED STD', categoria: 'scooter-semiautomatica',
    lema: 'Scooter práctica para tu rutina',
    versiones: [{ id: 'std', nombre: 'DIO STD 110', precios: { 2026: 7190000, 2027: 7390000 } }],
    colores: [c('rojo', 'rojo'), c('azul', 'azul')],
    oficial: 'https://motos.honda.com.co/motos-honda/scooter-y-semiautomatica/DIO-LED-STD',
  },
  {
    slug: 'wave-110s', nombre: 'Wave 110S', categoria: 'scooter-semiautomatica',
    lema: 'Semiautomática fácil de manejar',
    versiones: [{ id: 'cbs', nombre: 'WAVE 110S CBS', precios: { 2026: 7650000, 2027: 7790000 } }],
    colores: [c('blanca', 'blanco'), c('gris', 'gris'), c('negra', 'negro'), c('roja', 'rojo')],
    oficial: 'https://motos.honda.com.co/motos-honda/scooter-y-semiautomatica/WAVE-110S',
  },

  // ───────────────────────── NAVI ─────────────────────────
  {
    slug: 'navi', nombre: 'Navi', categoria: 'navi',
    lema: 'Diversión compacta para moverte por la ciudad',
    versiones: [{ id: 'std', nombre: 'NAVI 2.0', precios: { 2026: 7090000, 2027: 7290000 } }],
    colores: [c('roja', 'rojo'), c('blanca', 'blanco'), c('negra', 'negro')],
    oficial: 'https://motos.honda.com.co/motos-honda/NAVI/NAVI',
  },
  {
    slug: 'navi-mix', nombre: 'Navi Mix', categoria: 'navi',
    lema: 'Navi con acabados bicolor',
    versiones: [{ id: 'std', nombre: 'NAVI MIX 2.0', precios: { 2026: 7390000, 2027: 7590000 } }],
    colores: [c('roja', 'rojo', 'Rojo / Negro'), c('negra', 'negro', 'Negro / Rojo')],
    oficial: 'https://motos.honda.com.co/motos-honda/NAVI/navi-mix',
  },
  {
    slug: 'navi-adventure', nombre: 'Navi Adventure', categoria: 'navi',
    lema: 'La Navi con espíritu aventurero',
    versiones: [{ id: 'std', nombre: 'NAVI ADVENTURE 2.0', precios: { 2026: 7440000, 2027: 7640000 } }],
    colores: [c('camuflado', 'beige', 'Camuflado')],
    oficial: 'https://motos.honda.com.co/motos-honda/NAVI/NAVI-ADVENTURE',
  },
  {
    slug: 'navi-rally', nombre: 'Navi Rally', categoria: 'navi',
    lema: 'Gráficas de competencia en formato Navi',
    versiones: [{ id: 'std', nombre: 'NAVI RALLY 2.0', precios: { 2026: 7440000, 2027: 7640000 } }],
    colores: [c('rally', 'rojo', 'Rally')],
    oficial: 'https://motos.honda.com.co/motos-honda/NAVI/NAVI-RALLY',
  },
]

/* ───────────────────────── Utilidades ───────────────────────── */
const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
export const cop = (n) => fmt.format(n).replace(/\s/g, '')

export const ANIO_ACTUAL = 2027
export const getMoto = (slug) => MOTOS.find((m) => m.slug === slug)
export const getCategoria = (id) => CATEGORIAS.find((x) => x.id === id || x.slug === id)
export const motosDe = (cat) => MOTOS.filter((m) => m.categoria === cat)
export const imgMoto = (m, colorId) => `/motos/${m.slug}/${colorId || m.colores[0].id}.webp`

/** Años modelo disponibles de una versión, del más nuevo al más antiguo. */
export const aniosDe = (v) => Object.keys(v.precios).map(Number).sort((a, b) => b - a)
/** Precio de una versión en el año pedido (o el más reciente disponible). */
export const precioDe = (v, anio) => v.precios[anio] ?? v.precios[aniosDe(v)[0]]
/** Precio "desde" del modelo: la versión más económica con su año modelo vigente. */
export const precioDesde = (m) => {
  const lista = m.versiones.map((v) => ({ v, anio: aniosDe(v)[0], precio: precioDe(v) }))
  return lista.sort((a, b) => a.precio - b.precio)[0]
}
