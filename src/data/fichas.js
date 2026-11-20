/**
 * ─────────────────────────────────────────────────────────────
 *  FICHAS TÉCNICAS (acordeones Motor · Seguridad · Características adicionales · Dimensiones)
 *
 *  Misma estructura que la ficha oficial de Honda Colombia (motos.honda.com.co).
 *  Ya está cargada la CB 190R 2.0 (fuente: ficha oficial). Para las demás motos el sitio
 *  muestra un acceso a la ficha oficial hasta que copies sus datos aquí:
 *
 *  'slug-de-la-moto': {
 *    kpis: { cc: '184.4', potencia: '16,4 HP / 8.500 RPM', torque: '15,5 Nm / 6.000 RPM' },
 *    destacados: ['…', '…'],
 *    specs: {
 *      Motor: [['Cilindraje', '…'], …],
 *      Seguridad: [[…]],
 *      'Características adicionales': [[…]],
 *      Dimensiones: [['Rueda delantera', '…'], ['Rueda trasera', '…'], ['Dimensión total', '…'],
 *                    ['Distancia entre ejes', '…'], ['Peso', '…']],
 *    },
 *  }
 * ─────────────────────────────────────────────────────────────
 */
export const FICHAS = {
  'cb-190r': {
    kpis: { cc: '184,4 cc', potencia: '16,4 HP / 8.500 RPM', torque: '15,5 Nm / 6.000 RPM' },
    destacados: [
      'Tablero digital TFT de 5 pulgadas',
      'Frenos ABS de doble canal',
      'Control de tracción HSTC',
      'Puerto de carga USB tipo C',
      'Suspensión delantera telescópica invertida',
      'Asiento de doble nivel',
    ],
    specs: {
      Motor: [
        ['Cilindraje', '184,4 cc'],
        ['Tipo de motor', '4T - OHC - Refrigerado por aire'],
        ['Potencia', '16,4 HP / 8.500 RPM'],
        ['Torque', '15,5 Nm / 6.000 RPM'],
        ['Relación de compresión', '9,5 : 1'],
        ['Tipo de transmisión', '5 velocidades'],
      ],
      Seguridad: [
        ['Freno delantero', 'Disco - ABS'],
        ['Freno trasero', 'Disco - ABS'],
        ['Suspensión delantera', 'Telescópica invertida'],
        ['Suspensión trasera', 'Monoamortiguada'],
      ],
      'Características adicionales': [
        ['Tipo de arranque', 'Eléctrico'],
        ['Certificación', 'EURO III'],
      ],
      Dimensiones: [
        ['Rueda delantera', '110/70 - R 17'],
        ['Rueda trasera', '140/70 - R 17'],
        ['Dimensión total', '2034 x 783 x 1064 mm'],
        ['Distancia entre ejes', '1.355 mm'],
        ['Peso', '141 kg'],
      ],
    },
  },
}
