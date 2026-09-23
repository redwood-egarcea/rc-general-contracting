import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const values = new Set([
  'contact@example.test',
  '+1 202 555 0100',
  'delivery@example.test',
]);
try {
  const privateRecord = await readFile('docs/contact-details.local.md', 'utf8');
  for (const match of privateRecord.matchAll(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  ))
    values.add(match[0]);
  for (const match of privateRecord.matchAll(
    /\b\d{3}[- .]\d{3}[- .]\d{4}\b/g,
  )) {
    values.add(match[0]);
    values.add(match[0].replace(/\D/g, ''));
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);
async function addBuild(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await addBuild(path);
    else files.push(path);
  }
}
await addBuild('dist');
const matches = [];
for (const path of files) {
  // These document synthetic fixtures, never actual business contacts.
  const content = await readFile(path, 'utf8');
  for (const value of values) {
    const synthetic =
      value.includes('example.test') || value === '+1 202 555 0100';
    if (synthetic && !path.startsWith('dist/')) continue;
    if (content.includes(value)) {
      matches.push(path);
      break;
    }
  }
}
if (matches.length)
  throw new Error(`Contact-value scan failed in: ${matches.join(', ')}`);
process.stdout.write(
  `Contact-value scan passed for ${files.length} tracked and built files.\n`,
);
