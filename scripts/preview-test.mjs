import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

// A separate preview configuration keeps local credentials out of all dist artifacts.
const config = JSON.parse(await readFile('dist/server/wrangler.json', 'utf8'));
config.main = resolve('dist/server', config.main);
config.assets.directory = resolve('dist/server', config.assets.directory);
config.vars.APP_ENV = 'development';
config.vars.ALLOWED_HOSTNAMES = 'localhost,127.0.0.1';
// The viewport matrix reloads pages far faster than a visitor. Enforcement is
// tested separately with the production guard and explicit limiter responses.
for (const limiter of config.ratelimits ?? []) {
  if (limiter.name === 'API_RATE_LIMITER') limiter.simple.limit = 1000;
}
// Production domains otherwise change Wrangler's simulated request hostname.
delete config.account_id;
delete config.routes;
delete config.route;
delete config.configPath;
delete config.userConfigPath;
await mkdir('.wrangler/test', { recursive: true });
await writeFile('.wrangler/test/wrangler.json', JSON.stringify(config));
await copyFile('.dev.vars.example', '.wrangler/test/.dev.vars');
const child = spawn(
  process.execPath,
  [
    'node_modules/wrangler/bin/wrangler.js',
    'dev',
    '--config',
    '.wrangler/test/wrangler.json',
    '--port',
    '8797',
    '--inspector-port',
    '9337',
    '--local',
  ],
  {
    stdio: 'inherit',
    env: { ...process.env, WRANGLER_WRITE_LOGS: 'false' },
  },
);
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code ?? 1));
