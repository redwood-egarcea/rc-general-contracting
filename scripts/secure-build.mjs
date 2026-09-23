import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const output = new URL('../dist/client/', import.meta.url);
const hashes = new Set();
async function scan(directory) {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, file.name);
    if (file.isDirectory()) await scan(path);
    else if (file.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc\s*=/i.test(match[1]) && match[2].trim()) hashes.add(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
      }
    }
  }
}
await scan(output.pathname);
const headersPath = new URL('_headers', output);
const headers = await readFile(headersPath, 'utf8');
await writeFile(headersPath, headers.replace("script-src 'self'", `script-src 'self' ${[...hashes].join(' ')}`));
