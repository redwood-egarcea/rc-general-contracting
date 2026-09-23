// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),
  session: false,
  integrations: [sitemap({ filter: (url) => !url.includes('/404') })],
  vite: { build: { assetsInlineLimit: 0 } },
});
