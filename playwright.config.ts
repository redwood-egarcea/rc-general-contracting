import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:8797', trace: 'retain-on-failure' },
  projects: [
    { name: 'security', testMatch: 'security.spec.ts' },
    {
      name: 'chromium',
      testMatch: 'site.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node scripts/preview-test.mjs',
    url: 'http://localhost:8797',
    reuseExistingServer: !process.env.CI,
    env: { WRANGLER_WRITE_LOGS: 'false' },
    timeout: 60_000,
  },
});
