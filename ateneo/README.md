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
| Enlaces de pago | `regiones[].pagos` | Los botones de compra llevan a la captación de correo |
| Alta de correo | `listaCorreo.endpoint` | El formulario cae a `mailto:` y no se pierde ningún contacto |
| Precios por región | `regiones[].precios` | — |

Tres cosas hay que hacer antes de publicar:

1. **Comprar el dominio** y ponerlo en `sitio.url` y en `astro.config.mjs`.
   También en `public/robots.txt`, que apunta al sitemap.
2. **Crear los productos en Hotmart**, uno por moneda, y pegar cada enlace en
   `regiones[].pagos`. Hotmart es *merchant of record*: liquida el IVA del país
   del comprador, que es lo que evita tener que entrar en la Ventanilla Única
   europea. Mientras `pagos` esté vacío el sitio se publica igual, sin vender.
3. **Crear la lista de correo** (MailerLite, ConvertKit, Buttondown…) y pegar el
   endpoint del formulario en `listaCorreo.endpoint`. Configurar que la
   confirmación redirija a `/gracias`, que es donde está la descarga.

## Precio regional

Se vende a España y a Latinoamérica, y el mismo archivo no vale lo mismo en
Madrid que en Tunja. Hay cuatro regiones en `src/config.ts` —`es` (EUR), `co`
(COP), `mx` (MXN) y `us` (USD, el cajón de sastre del resto del mundo)— cada una
con sus precios, sus métodos de pago anunciados y sus propios enlaces de
Hotmart, porque Hotmart genera una oferta distinta por moneda.

Cómo funciona, siendo un sitio estático sin servidor:

1. El HTML trae **las cuatro monedas** de cada precio, cada una marcada con
   `data-precio-region`.
2. Un script en línea en `Base.astro` resuelve la región **antes de pintar** —
   elección guardada → zona horaria → idioma → continente → España por defecto—
   y la estampa en `<html data-region="…">`.
3. El CSS de `global.css` muestra la variante que toca y esconde las otras tres.

Consecuencias que conviene no romper:

- **Sin JavaScript se ven los euros**, nunca un hueco.
- **No hay parpadeo**: la región se decide antes del primer pintado.
- El selector del pie gana sobre la detección y se guarda en `localStorage`,
  porque la zona horaria se equivoca con VPN y con el colombiano que estudia en
  Madrid.
- El JSON-LD declara el precio en **euros**, que es el de referencia: los datos
  estructurados no pueden variar por visitante.

Para cambiar un precio o añadir una moneda se toca solo `regiones` en
`src/config.ts`. Ningún componente lleva un precio escrito a mano: todos usan
`Precio.astro`, `MetodosPago.astro` y `BotonCompra.astro`.

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
  components/
    Precio.astro             precio en la moneda de quien mira
    MetodosPago.astro        «cómo se paga», distinto por región
    BotonCompra.astro        enlace de Hotmart por moneda
    SelectorRegion.astro     cambio manual de región, en el pie
    CapturaCorreo.astro      formulario de alta en la lista
    DemoIncrustada.astro     demo que se carga al pulsar
    Cabecera.astro / PieDePagina.astro / TarjetaTema.astro
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
