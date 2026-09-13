/**
 * Configuración central de Ateneo.
 * Todo lo que cambia de un despliegue a otro vive aquí: dominio, precios por
 * región, enlaces de pago y endpoint de captación. Ningún componente debe
 * llevar una URL ni un precio escrito a mano.
 */

export const sitio = {
  nombre: 'Ateneo',
  lema: 'Revisiones de tema listas para presentar',
  descripcion:
    'Revisiones de tema interactivas con la evidencia actualizada, para internos y residentes que tienen que presentar. HTML interactivo, PowerPoint editable y handout en PDF.',
  url: 'https://ateneo.med',
  autor: 'Dr. Javier Calderón',
  correoContacto: 'hola@ateneo.med',
  tiktok: 'https://www.tiktok.com/@ateneo.med',
  instagram: 'https://www.instagram.com/ateneo.med',
};

/**
 * Captación de correo (MailerLite).
 *
 * El formulario «Ateneo · Captación web» alimenta el grupo «Ateneo · Lista
 * principal». Lleva **doble confirmación**: quien se apunta recibe un correo y
 * no entra en la lista hasta que pulsa el enlace. Es más fricción, pero es lo
 * que corresponde con el RGPD y mantiene sana la entregabilidad.
 *
 * Si `endpoint` se vacía, el formulario cae a un mailto y no se pierde ningún
 * contacto.
 */
export const listaCorreo = {
  endpoint:
    'https://assets.mailerlite.com/jsonp/2632643/forms/198496808546076389/subscribe',
  campoCorreo: 'fields[email]',
  campoOrigen: 'fields[origen]',
  /** Grupo de destino, por si hace falta apuntar otro formulario al mismo sitio. */
  grupo: '198496793924732736',
};

/* ------------------------------------------------------------------ */
/*  Precio regional                                                     */
/* ------------------------------------------------------------------ */

/**
 * El mismo archivo no vale lo mismo en Madrid que en Tunja. Cada región lleva
 * su moneda, sus precios y sus propios enlaces de pago, porque Hotmart genera
 * una oferta distinta por moneda.
 *
 * La región se resuelve en el navegador (ver Base.astro): elección guardada →
 * zona horaria → idioma → `REGION_POR_DEFECTO`. El HTML trae las cuatro
 * variantes y el CSS muestra la que toca, así que el sitio sigue siendo
 * estático y funciona sin JavaScript.
 */
export type Region = 'es' | 'co' | 'mx' | 'us';

export const REGION_POR_DEFECTO: Region = 'es';

/**
 * Respaldo para el continente americano. Sin esto, quien está en Buenos Aires,
 * Lima o Santiago no coincide con ninguna zona concreta y acabaría viendo euros.
 */
export const REGION_AMERICAS: Region = 'us';

export type Nivel = 'temaSuelto' | 'pack' | 'mensual' | 'anual';

export interface ConfigRegion {
  codigo: Region;
  /** Cómo se nombra en el selector. */
  nombre: string;
  moneda: string;
  precios: Record<Nivel, string>;
  /** Enlaces de pago de Hotmart para esta moneda. Vacío = cobro apagado. */
  pagos: Partial<Record<Nivel, string>>;
  /** Zonas horarias que caen en esta región. */
  zonas: string[];
  /** Prefijos de `navigator.language` que caen en esta región. */
  idiomas: string[];
  /** Métodos de pago que se anuncian en la ficha. */
  metodosPago: string;
}

export const regiones: ConfigRegion[] = [
  {
    codigo: 'es',
    nombre: 'España (EUR)',
    moneda: 'EUR',
    precios: {
      temaSuelto: '14,90 €',
      pack: '44 €',
      mensual: '9,90 €',
      anual: '79 €',
    },
    pagos: {},
    zonas: ['Europe/Madrid', 'Atlantic/Canary', 'Africa/Ceuta'],
    idiomas: ['es-ES', 'ca', 'gl', 'eu'],
    metodosPago: 'Tarjeta, PayPal o transferencia.',
  },
  {
    codigo: 'co',
    nombre: 'Colombia (COP)',
    moneda: 'COP',
    precios: {
      temaSuelto: '39.000 COP',
      pack: '129.000 COP',
      mensual: '29.900 COP',
      anual: '249.000 COP',
    },
    pagos: {},
    zonas: ['America/Bogota'],
    idiomas: ['es-CO'],
    metodosPago: 'PSE, tarjeta, billeteras o en cuotas. Sin tarjeta internacional.',
  },
  {
    codigo: 'mx',
    nombre: 'México (MXN)',
    moneda: 'MXN',
    precios: {
      temaSuelto: '189 MXN',
      pack: '549 MXN',
      mensual: '139 MXN',
      anual: '1.149 MXN',
    },
    pagos: {},
    zonas: [
      'America/Mexico_City',
      'America/Monterrey',
      'America/Tijuana',
      'America/Cancun',
      'America/Merida',
      'America/Chihuahua',
      'America/Hermosillo',
      'America/Mazatlan',
    ],
    idiomas: ['es-MX'],
    metodosPago: 'OXXO, SPEI, tarjeta o en mensualidades.',
  },
  {
    codigo: 'us',
    nombre: 'Resto del mundo (USD)',
    moneda: 'USD',
    precios: {
      temaSuelto: 'US$ 9,90',
      pack: 'US$ 32',
      mensual: 'US$ 7,90',
      anual: 'US$ 66',
    },
    pagos: {},
    // Sin zonas ni idiomas propios: es el cajón de sastre para el resto de
    // América (Argentina, Perú, Chile, EE. UU.) vía REGION_AMERICAS.
    zonas: [],
    idiomas: [],
    metodosPago: 'Tarjeta, PayPal y métodos locales según el país.',
  },
];

export function region(codigo: Region): ConfigRegion {
  return regiones.find((r) => r.codigo === codigo) ?? regiones[0];
}

/** Región que se muestra cuando el navegador todavía no ha dicho nada. */
export const regionPorDefecto = region(REGION_POR_DEFECTO);

/**
 * ¿Hay algún enlace de pago configurado para este nivel, en cualquier región?
 * Mientras no lo haya, los botones de compra llevan a la captación de correo
 * en lugar de a un checkout roto, y el sitio se puede publicar sin vender.
 */
export function hayCobro(nivel: Nivel): boolean {
  return regiones.some((r) => Boolean(r.pagos[nivel]));
}

/** Tabla que consume el script de detección del navegador. */
export const mapaDeteccion = regiones.map((r) => ({
  codigo: r.codigo,
  zonas: r.zonas,
  idiomas: r.idiomas,
}));
