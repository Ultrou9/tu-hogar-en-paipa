/**
 * Configuración central de Ateneo.
 * Todo lo que cambia de un despliegue a otro vive aquí: dominio, enlaces de
 * pago y endpoint de captura de correo. Ningún componente debe llevar una URL
 * escrita a mano.
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
 * Enlaces de pago. Se generan en Hotmart (LatAm, admite PSE y cuotas) y se
 * pegan aquí. Mientras estén vacíos, los botones llevan a la lista de espera
 * en lugar de a un checkout roto.
 */
export const pagos = {
  hotmartBase: '', // p. ej. 'https://pay.hotmart.com'
  suscripcionMensual: '',
  suscripcionAnual: '',
  packCardiologia: '',
};

/**
 * Captura de correo. Pegar aquí el endpoint del proveedor (MailerLite,
 * ConvertKit, Buttondown…). Si está vacío, el formulario se degrada a un
 * mailto y no se pierde ningún contacto.
 */
export const listaCorreo = {
  endpoint: '',
  campoCorreo: 'email',
};

export const precios = {
  temaSuelto: { cop: '39.000', usd: '9,9', eur: '14,9' },
  pack: { cop: '129.000', usd: '32', eur: '44' },
  mensual: { cop: '29.900', usd: '7,9', eur: '9,9' },
  anual: { cop: '249.000', usd: '66', eur: '79' },
};
