# Glow up visual (nov-2026)

Se rediseñó **solo el envoltorio visual y la interacción**. No cambió ningún texto, dato, precio, imagen de moto, ruta ni lógica
(WhatsApp, rotación de asesores, simulador, comparador, formularios).

| Qué | Dónde |
|---|---|
| Sistema de diseño (tokens de color, tipografía, espaciado 4/8, radios, sombras, blur, gradientes, easings) | `src/styles/global.css` (secciones 1-3) |
| Modo claro / oscuro (respeta el sistema y recuerda la elección) | `src/hooks/useTheme.js` + botón en el header |
| Hero + carrusel de banners | `src/components/HeroCarousel.jsx` · imágenes en `public/banners/` |
| Iconografía unificada (Phosphor Icons, peso "regular", 24 px base) | `src/components/Icons.jsx` |
| Scroll reveal con Intersection Observer | `src/hooks/useReveal.js` (lista de selectores al inicio del archivo) |
| Floating labels, focus ring, errores accesibles | `src/components/LeadForm.jsx` + sección 9 del CSS |
| Tipografía: **Sora** (display) + **DM Sans** (cuerpo), autoalojadas con Fontsource | `src/main.jsx` |
| Antes / después | `docs/antes-despues.png` |

## Banners del hero
Los JPG enviados se convirtieron a WebP (1280 y 1920 px) en `public/banners/<slug>-1280|1920.webp`.
En `HeroCarousel.jsx` cada banner nuevo está marcado con un comentario `BANNER NUEVO`; los slides que todavía no tienen
foto (XR 190L 2.0 y Navi) conservan su recorte original y están marcados `PLACEHOLDER`.
Para agregar o cambiar un banner: copia la imagen a `public/banners/` y edita el objeto en `SLIDES`
(`lado` = lado del texto para no tapar al motociclista, `foco` = parte de la foto que se conserva en móvil).
El banner "Una moto con África en su ADN" (`Optimizacion-de-portadas333_1.jpg`) **no se usó**: ya trae texto y logo incrustados,
es de 1080 px y la Africa Twin no está en el catálogo de este sitio.

## Notas técnicas
- Breakpoints mobile-first: 640 / 768 / 1024 / 1280 / 1536. Rejillas sobre 12 columnas.
- Solo se animan `transform` y `opacity`; imágenes con `width/height` o `aspect-ratio` para evitar saltos de layout; `loading="lazy"` salvo el primer banner (`fetchpriority="high"`).
- `prefers-reduced-motion` desactiva animaciones, zoom del banner, autoplay por animación y reveal.
- Carrusel: autoplay con barra de progreso, pausa en hover/foco/botón, flechas, teclado (← →), swipe en móvil, `aria-live` dinámico.
- Si `npm run build` da "Permission denied" en `vite`, usa `node node_modules/vite/bin/vite.js build`.

---

# Honda · Sumoto (Valle del Cauca)

Sitio del concesionario Honda de SUMOTO S.A. — React 18 + Vite 5 + React Router 6.
Una pestaña por cada zona del menú de la tienda Honda (tienda.honda.com.co).

## Cómo correrlo
```bash
npm install
npm run dev        # desarrollo  → http://localhost:5173
npm run build      # genera /dist para publicar
```
`public/_redirects` (Netlify) y `public/.htaccess` (Apache) ya resuelven las rutas de React Router.

## Pestañas (rutas)
| Menú | Ruta |
|---|---|
| Inicio | `/` |
| Motocicletas (+ ficha) | `/motocicletas` · `/motocicletas/:slug` |
| Repuestos | `/repuestos` |
| Accesorios | `/accesorios` |
| Concesionarios | `/concesionarios` |
| Financia tu moto | `/financia-tu-moto` |
| Honda te cuenta | `/honda-te-cuenta` |
| Contáctenos | `/contacto` |
| Live Store | `/live-store` |
| Campañas de seguridad | `/campanas-de-seguridad` |

## Dónde se edita cada cosa
| Qué | Archivo |
|---|---|
| Sedes, WhatsApp de asesores/taller/repuestos, horarios, correo, redes, tasa del simulador | `src/data/sitio.js` |
| Motos, versiones, colores y **precios** (lista oficial 1-oct-2026) | `src/data/motos.js` |
| Fichas técnicas (Motor · Seguridad · Características · Dimensiones) | `src/data/fichas.js` |
| Categorías de repuestos/accesorios, financieras, artículos, preguntas frecuentes | `src/data/contenido.js` |
| Fotos | `public/motos/<slug>/<color>.webp` |
| Logo | `public/brand/logo-honda.svg` (**provisional**: reemplázalo por el oficial) |

## Pendientes antes de publicar (buscar `PENDIENTE` en `src/data/sitio.js`)
1. Direcciones, enlaces de Google Maps, WhatsApp de asesores / taller / repuestos y horarios reales de cada sede (hoy hay dos sedes de ejemplo: Palmira y Cali).
2. Logo oficial de Honda y redes sociales propias del concesionario.
3. Tasa mensual de Progreser / Sufi para el simulador (`tasaMensual`). Mientras sea `null`, el cliente escribe la tasa.
4. Fichas técnicas: solo la CB 190R 2.0 está cargada (copiada de la ficha oficial). Las demás motos muestran un botón a su ficha oficial hasta que copies sus datos en `fichas.js` con la misma estructura.
5. Fotos: la CB 125F MAX y la CB 125F DLX MAX usan la imagen de su versión base; la PCX 160 FP usa la de la PCX ABS. La foto "PCX tarjeta.png" (gris) no se usó por su baja resolución.
6. Revisar discrepancia de precio: CB 190R 2.0 modelo 2027 → lista 1-oct: $12.790.000; la tienda nacional mostraba $12.590.000.

## Notas de precios
- Solo se publica el **precio público con IVA**. Los descuentos de distribuidor (crédito/contado) de la lista son internos y no están en el sitio.
- Motos de más de 200 cc (CB 300F y XR 300L Tornado): el sitio indica que se aplica impuesto al consumo en la facturación al cliente final (según la nota de la lista).
- Para modelos con dos años (2026 / 2027) la ficha permite elegir el año; la tarjeta muestra el más reciente.

## Formularios
Todos los formularios arman el mensaje y abren WhatsApp con la sede seleccionada (rotación de asesores en `sitio.js`). Incluyen casilla de autorización de tratamiento de datos (Ley 1581 de 2012); revisa el texto con el área jurídica.
