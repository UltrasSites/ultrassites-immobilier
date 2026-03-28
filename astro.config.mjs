import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  site: 'https://immobilier.ultras-sites.com',
});
