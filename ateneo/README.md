# Ateneo

Catálogo web de revisiones de tema médicas interactivas, para internos y
residentes que tienen que presentar.

Sitio estático con Astro. Sin servidor, sin base de datos y sin coste mensual:
el cobro sale a Hotmart y la captura de correo a un proveedor externo.

## Poner a andar

```bash
cd ateneo
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

## Lo primero que hay que configurar

Todo lo que cambia de un despliegue a otro está en `src/config.ts`. No hay
ninguna URL escrita a mano dentro de los componentes.

| Qué | Dónde | Mientras esté vacío |
| --- | --- | --- |
| Dominio | `sitio.url` y `site` en `astro.config.mjs` | Las canónicas apuntan a `ateneo.med` |
| Enlaces de pago | `pagos.*` | Los botones de compra llevan a la captura de correo |
| Alta de correo | `listaCorreo.endpoint` | El formulario cae a `mailto:` y no se pierde ningún contacto |
| Precios | `precios.*` | — |

Tres cosas hay que hacer antes de publicar:

1. **Comprar el dominio** y ponerlo en `sitio.url` y en `astro.config.mjs`.
   También en `public/robots.txt`, que apunta al sitemap.
2. **Crear los productos en Hotmart** y pegar los enlaces de pago en `pagos`.
3. **Crear la lista de correo** (MailerLite, ConvertKit, Buttondown…) y pegar el
   endpoint del formulario en `listaCorreo.endpoint`. Configurar que la
   confirmación redirija a `/gracias`, que es donde está la descarga.

## Añadir un tema nuevo

Dos pasos, unos cinco minutos:

1. Copiar el HTML de la presentación a `public/demos/<slug>.html`.
2. Añadir un objeto al array de `src/data/presentaciones.ts`.

Con eso se generan solos: la ficha de producto en `/temas/<slug>`, la tarjeta en
la portada y el catálogo, la entrada del sitemap y los datos estructurados de
`Product` que lee Google.

El campo `estado` decide cómo se muestra:

- `gratis` — se entrega a cambio del correo (hoy, la de insuficiencia cardiaca)
- `publicado` — se vende; necesita `enlacePago` o `pagos.hotmartBase`
- `produccion` — se anuncia con fecha y acumula lista de espera

## Estructura

```
src/
  config.ts                  configuración: dominio, pagos, correo, precios
  data/presentaciones.ts     el catálogo — la única fuente de verdad
  styles/global.css          tokens de diseño, los mismos de las presentaciones
  layouts/Base.astro         meta, canónica, Open Graph, JSON-LD, fuentes
  components/                cabecera, pie, tarjeta de tema, captura de correo
  pages/
    index.astro              portada con demo en vivo
    catalogo.astro           disponibles y en producción
    temas/[slug].astro       ficha de producto (la página que posiciona)
    gratis.astro             landing de un solo objetivo para el enlace de la bio
    suscripcion.astro        los tres niveles de precio
    licencias.astro          programas de residencia, servicios y facultades
    gracias.astro            descarga tras el alta de correo
public/demos/                las presentaciones, servidas tal cual
```

## Desplegar

Cloudflare Pages o Vercel, ambos gratis para esto:

- Comando de compilación: `npm run build`
- Directorio de salida: `dist`
- Directorio raíz del proyecto: `ateneo`

Luego apuntar el dominio al proyecto desde el panel del proveedor.

## Criterios de contenido

Que no se pierdan al crecer el catálogo:

- **Figuras propias.** Ni una tabla o gráfico copiado de una guía. Se
  reconstruye desde los datos publicados y se cita la fuente. Es lo que permite
  vender esto legalmente.
- **Versión y fecha visibles** en cada revisión. Es la prueba de por qué la
  suscripción vale la pena.
- **Descargo de responsabilidad** en cada archivo: material educativo, no
  sustituye el juicio clínico, no dirigido a pacientes.
- **Un solo archivo HTML por presentación**, sin dependencias externas más allá
  de las fuentes, para que funcione sin internet en el aula.
