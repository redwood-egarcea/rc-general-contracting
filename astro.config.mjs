// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { parse } from 'jsonc-parser';

const { vars } = parse(
  readFileSync(new URL('./wrangler.jsonc', import.meta.url), 'utf8'),
);
const site =
  process.env.PUBLIC_SITE_URL ||
  vars.PUBLIC_SITE_URL ||
  'http://localhost:4325';
const local = ['localhost', '127.0.0.1'].includes(new URL(site).hostname);
const publicVariables = {
  PUBLIC_SITE_URL: site,
  PUBLIC_TURNSTILE_SITE_KEY:
    process.env.PUBLIC_TURNSTILE_SITE_KEY ||
    vars.PUBLIC_TURNSTILE_SITE_KEY ||
    (local ? '1x00000000000000000000AA' : ''),
  PUBLIC_TURNSTILE_REVEAL_SITE_KEY:
    process.env.PUBLIC_TURNSTILE_REVEAL_SITE_KEY ||
    vars.PUBLIC_TURNSTILE_REVEAL_SITE_KEY ||
    (local ? '1x00000000000000000000AA' : ''),
  PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN:
    process.env.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN ||
    vars.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
};
if (
  !local &&
  [
    publicVariables.PUBLIC_TURNSTILE_SITE_KEY,
    publicVariables.PUBLIC_TURNSTILE_REVEAL_SITE_KEY,
  ].some((key) => !key || /^[123]x0{20}/.test(key))
) {
  throw new Error('Production builds require real Turnstile site keys.');
}
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),
  session: false,
  integrations: [sitemap({ filter: (url) => !url.includes('/404') })],
  vite: {
    build: { assetsInlineLimit: 0 },
    define: Object.fromEntries(
      Object.entries(publicVariables).map(([name, value]) => [
        `import.meta.env.${name}`,
        JSON.stringify(value),
      ]),
    ),
  },
});
