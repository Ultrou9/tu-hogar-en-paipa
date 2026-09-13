import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambiar SITE al dominio definitivo antes de desplegar.
export default defineConfig({
  site: 'https://ateneo.med',
  integrations: [
    sitemap({
      // Páginas de destino tras una conversión: no deben indexarse.
      filter: (page) => !page.includes('/gracias'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
