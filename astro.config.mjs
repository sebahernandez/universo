// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Cambia esto por el dominio final del sitio (usado para sitemap, canonical y OG).
const SITE = 'https://www.universocrafter.cl';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Optimización local con Sharp (AVIF/WebP, srcset, dimensiones).
    responsiveStyles: true,
  },
});
