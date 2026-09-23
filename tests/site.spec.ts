import { test, expect } from '@playwright/test';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import urlMap from '../docs/url-map.json' with { type: 'json' };

const pages = [
  { path: '/', name: 'home', status: 200 },
  { path: '/services/', name: 'services', status: 200 },
  { path: '/contact/', name: 'contact', status: 200 },
  { path: '/missing-page/', name: '404', status: 404 },
];

test('every URL resolves with its expected status', async ({ request }) => {
  for (const entry of urlMap) {
    const response = await request.get(entry.old || entry.new, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(entry.status);
    if (entry.status === 301)
      expect(response.headers().location).toContain(entry.new);
  }
});

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [360, 768, 1024, 1440, 1920]) {
    test(`${colorScheme} layouts at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 360 ? 800 : 1000 });
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (event) => {
        if (event.type() === 'error') errors.push(event.text());
      });
      for (const entry of pages) {
        const response = await page.goto(entry.path);
        expect(response?.status()).toBe(entry.status);
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (const img of document.images) {
            img.loading = 'eager';
          }
          await Promise.all(
            [...document.images].map((img) => img.decode().catch(() => {})),
          );
        });
        await expect(page.locator('h1')).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        expect(await page.locator('img:not([alt])').count()).toBe(0);
        expect(
          await page
            .locator('img')
            .evaluateAll((images) =>
              images.every((img) => img.complete && img.naturalWidth > 0),
            ),
        ).toBe(true);
        const badTargets = await page
          .locator('button:visible, nav a:visible, .button:visible')
          .evaluateAll((elements) =>
            elements
              .filter((element) => {
                const rect = element.getBoundingClientRect();
                return rect.width < 43 || rect.height < 43;
              })
              .map((element) => element.textContent),
          );
        expect(badTargets).toEqual([]);
        if (process.env.CAPTURE_SCREENSHOTS) {
          await mkdir('docs/screenshots/new', { recursive: true });
          await page.screenshot({
            path: `docs/screenshots/new/${entry.name}-${colorScheme}-${width}.png`,
            fullPage: true,
          });
        }
      }
      expect(
        errors.filter((message) => !message.includes('404 (Not Found)')),
      ).toEqual([]);
    });
  }
}

test('contact reveal verifies a dummy token and returns one synthetic detail with no-store', async ({
  request,
}) => {
  for (const kind of ['email', 'phone']) {
    const response = await request.post('/api/contact', {
      headers: { Origin: 'http://localhost:8797' },
      data: { kind, token: 'XXXX.DUMMY.TOKEN.XXXX' },
    });
    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toBe('no-store');
    const body = await response.json();
    expect(body.value).toBe(
      kind === 'email' ? 'contact@example.test' : '+1 202 555 0100',
    );
    expect(JSON.stringify(body)).not.toContain(
      kind === 'email' ? '+1 202 555 0100' : 'contact@example.test',
    );
  }
});

test('API rejects missing tokens, honeypots and unexpected content types', async ({
  request,
}) => {
  const headers = { Origin: 'http://localhost:8797' };
  const missing = await request.post('/api/contact', {
    headers,
    data: { kind: 'email' },
  });
  expect(missing.status()).toBe(400);
  const honey = await request.post('/api/submit', {
    headers,
    data: {
      name: 'Example',
      email: 'visitor@example.test',
      message: 'Test',
      website: 'spam',
      token: 'XXXX.DUMMY.TOKEN.XXXX',
    },
  });
  expect(honey.status()).toBe(400);
  const type = await request.post('/api/contact', {
    headers: { ...headers, 'Content-Type': 'text/plain' },
    data: '{}',
  });
  expect(type.status()).toBe(415);
});

test('keyboard navigation reaches the skip link and form labels are exposed', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Your name', { exact: true })).toBeVisible();
  await expect(
    page.getByLabel('Your email address', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel('About your project', { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('[data-contact-form] [role=status]'),
  ).toHaveAttribute('aria-live', 'polite');
});

test('verification failure keeps the enquiry and allows retry', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page.getByLabel('Your name', { exact: true }).fill('Test visitor');
  await page
    .getByLabel('Your email address', { exact: true })
    .fill('visitor@example.test');
  await page
    .getByLabel('About your project', { exact: true })
    .fill('Test enquiry with an accessible entrance.');
  await page.locator('[data-form-widget]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-contact-form] [role=status]')).toContainText(
    'Verification complete',
    { timeout: 30_000 },
  );
  await page.route('**/api/submit', (route) =>
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: false,
        message:
          'Verification expired or was already used. Please verify again and retry.',
      }),
    }),
  );
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.locator('[data-contact-form] [role=status]')).toContainText(
    'Verification expired',
  );
  await expect(page.getByLabel('Your name', { exact: true })).toHaveValue(
    'Test visitor',
  );
  await expect(
    page.getByLabel('About your project', { exact: true }),
  ).toHaveValue('Test enquiry with an accessible entrance.');
  await page.getByRole('button', { name: 'Retry verification' }).press('Enter');
  await expect(page.locator('[data-contact-form] [role=status]')).toContainText(
    'Verification complete',
    { timeout: 30_000 },
  );
  await expect(
    page.getByRole('button', { name: 'Send enquiry', exact: true }),
  ).toBeFocused();
});

test('no-JavaScript visitors have working social fallbacks', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:8797/contact/');
  await expect(page.locator('noscript').first()).toBeVisible();
  await expect(page.locator('a[href*="facebook.com"]').first()).toBeVisible();
  await expect(page.locator('a[href*="instagram.com"]').first()).toBeVisible();
  await context.close();
});

test('synthetic contact secrets are absent from all built files', async () => {
  async function scan(directory: string): Promise<void> {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, item.name);
      if (item.isDirectory()) await scan(path);
      else {
        const content = await readFile(path, 'utf8');
        for (const value of [
          'contact@example.test',
          '+1 202 555 0100',
          'delivery@example.test',
        ])
          expect(content, path).not.toContain(value);
      }
    }
  }
  await scan('dist');
});

test('capture the approved comp viewport', async ({ page }) => {
  test.skip(!process.env.CAPTURE_SCREENSHOTS, 'Review evidence only');
  await page.setViewportSize({ width: 1505, height: 1045 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await document.querySelector<HTMLImageElement>('main img')?.decode();
  });
  await mkdir('.impeccable/review', { recursive: true });
  await page.screenshot({ path: '.impeccable/review/desktop.png' });
});
