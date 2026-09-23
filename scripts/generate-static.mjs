import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'jsonc-parser';

const config = parse(
  await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
);
const site = process.env.PUBLIC_SITE_URL || config.vars.PUBLIC_SITE_URL;
const map = JSON.parse(
  await readFile(new URL('../docs/url-map.json', import.meta.url), 'utf8'),
);
const redirects = map
  .filter((entry) => entry.status === 301)
  .map((entry) => `${entry.old} ${entry.new} 301`)
  .join('\n');
await writeFile(
  new URL('../public/_redirects', import.meta.url),
  `# Generated from docs/url-map.json\n${redirects}\n`,
);
await writeFile(
  new URL('../public/robots.txt', import.meta.url),
  site?.startsWith('https://')
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n',
);
