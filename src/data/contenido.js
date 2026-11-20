/**
 * Contenido editorial de las pestañas (repuestos, accesorios, financieras, blog, campañas).
 * Los enlaces apuntan a las secciones oficiales de Honda Colombia.
 */
const T = 'https://tienda.honda.com.co'

export const REPUESTOS = [
  { id: 'baterias', nombre: 'Baterías', texto: 'Energía confiable para el arranque de tu moto.', url: `${T}/repuestos/bater%C3%ADas/`, icono: 'bateria' },
  { id: 'llantas', nombre: 'Llantas', texto: 'Agarre y seguridad en cada trayecto.', url: `${T}/repuestos/llantas/`, icono: 'llanta' },
  { id: 'lubricantes', nombre: 'Lubricante Pro Honda', texto: 'Protección para el motor de tu Honda.', url: `${T}/repuestos/lubricante-pro-honda/`, icono: 'aceite' },
  { id: 'originales', nombre: 'Repuestos originales Honda', texto: 'Piezas genuinas con la calidad de fábrica.', url: `${T}/repuestos/repuestos-originales-honda/`, icono: 'llave' },
]

export const ACCESORIOS = [
  { id: 'cascos', nombre: 'Cascos', texto: 'Protección y estilo para rodar tranquilo.', url: `${T}/accesorios/cascos/`, icono: 'casco' },
  { id: 'defensas', nombre: 'Defensas y parrillas', texto: 'Resguarda tu moto y gana capacidad de carga.', url: `${T}/accesorios/defensas-y-parrillas/`, icono: 'escudo' },
  { id: 'equipaje', nombre: 'Equipaje', texto: 'Maleteros y baúles para llevar todo.', url: `${T}/accesorios/equipaje/`, icono: 'maleta' },
  { id: 'limpieza', nombre: 'Limpieza y mantenimiento', texto: 'Cuidado y brillo para tu Honda.', url: `${T}/accesorios/limpieza-y-mantenimiento/`, icono: 'gota' },
  { id: 'ropa', nombre: 'Ropa Honda Store', texto: 'Camisetas, busos y gorras de la marca.', url: `${T}/buscar/?cgid=ROPA%20PROTECCION&pdshow=true`, icono: 'camiseta' },
  { id: 'seguridad', nombre: 'Seguridad moto', texto: 'Alarmas y soluciones antirrobo.', url: `${T}/accesorios/seguridad-moto/`, icono: 'candado' },
]

export const FINANCIERAS = [
  {
    id: 'progreser', nombre: 'Progreser',
    texto: 'Financia tu moto Honda con Progreser, aliado de la marca. Consulta requisitos y condiciones vigentes en su portal.',
    url: 'https://motos.honda.com.co/financiacion-motos',
  },
  {
    id: 'sufi', nombre: 'Sufi',
    texto: 'Otra opción de crédito para estrenar tu Honda. Revisa condiciones y solicita tu estudio de crédito.',
    url: 'https://motos.honda.com.co/financiacion-motos-sufi',
  },
]

export const ARTICULOS = [
  {
    titulo: 'Documentos obligatorios para conducir moto en Colombia: conoce los requisitos',
    categoria: 'Seguridad vial', fecha: '5 de noviembre de 2026', moto: 'nx-190',
    texto: 'Repasa los documentos que debes llevar y mantén tus papeles al día en cada recorrido.',
    url: 'https://motos.honda.com.co/magazine/documentos-obligatorios-para-conducir-moto',
  },
  {
    titulo: 'Motos 125 cc: eficiencia, diseño y tecnología para cada trayecto',
    categoria: 'Motos', fecha: '29 de octubre de 2026', moto: 'cb-125f',
    texto: 'Por qué una moto 125 es ideal para el día a día y claves para elegir la indicada.',
    url: 'https://motos.honda.com.co/magazine',
  },
  {
    titulo: 'Honda CB 125 Hornet: todo lo que debes saber sobre su lanzamiento',
    categoria: 'Motos', fecha: '21 de octubre de 2026', moto: 'cb-125-hornet',
    texto: 'Diseño deportivo, características y novedades de la Hornet 2027 en Colombia.',
    url: 'https://motos.honda.com.co/magazine',
  },
  {
    titulo: 'Nueva CB 300F: estilo puro a donde quiera que vayas',
    categoria: 'Motos', fecha: '22 de agosto de 2026', moto: 'cb-300f',
    texto: 'Una moto versátil y elegante: conoce sus características y beneficios.',
    url: 'https://motos.honda.com.co/magazine',
  },
  {
    titulo: 'X-Blade 160: conoce sus principales características',
    categoria: 'Motos', fecha: '', moto: 'xblade-160',
    texto: 'Ficha técnica y todo lo que necesitas saber de la X-Blade 160.',
    url: 'https://motos.honda.com.co/honda-te-cuenta/blog/conoce-todo-de-la-xblade-160-ficha-tecnica-y-mas',
  },
  {
    titulo: 'Comprar moto: una gran inversión',
    categoria: 'Motos', fecha: '', moto: 'cb-190r',
    texto: 'Descubre por qué comprar moto es una excelente inversión.',
    url: 'https://motos.honda.com.co/honda-te-cuenta/blog/descubre-por-que-comprar-moto-es-una-excelente-inversion',
  },
  {
    titulo: 'PCX 160 ABS: muévete a tu ritmo',
    categoria: 'Motos', fecha: '', moto: 'pcx-160-abs',
    texto: 'Conoce la scooter que te acompaña en cada recorrido urbano.',
    url: 'https://motos.honda.com.co/honda-te-cuenta/blog/pcx-160-abs-muevete-a-tu-ritmo',
  },
]

export const PREGUNTAS = [
  { q: '¿Cómo cotizo una moto?', a: 'Entra a la ficha de la moto que te gusta y pulsa “Cotizar por WhatsApp”. Un asesor de la sede que elegiste te responde con la información disponible.' },
  { q: '¿Los precios incluyen matrícula y SOAT?', a: 'Los precios publicados son el precio público con IVA de la lista de Honda. No incluyen matrícula, SOAT ni seguros. En motos de más de 200 cc se aplica impuesto al consumo en la facturación al cliente final. Tu asesor te confirma el valor total.' },
  { q: '¿Puedo financiar mi moto?', a: 'Sí. En la pestaña “Financiación” encuentras las financieras aliadas de Honda y un simulador informativo. La aprobación y condiciones las define la entidad financiera.' },
  { q: '¿Dónde compro repuestos y accesorios?', a: 'En la pestaña “Posventa” te llevamos a la tienda oficial de Honda o cotizas con nuestro equipo por WhatsApp.' },
  { q: '¿Cómo sé si mi moto tiene una campaña de seguridad?', a: 'Ingresa a “Posventa”, sección “Campañas de seguridad”, y verifica tu moto en el portal oficial de Honda. Si tienes dudas, te acompañamos en el taller.' },
]
