import { test, expect, type Page } from '@playwright/test';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import urlMap from '../docs/url-map.json' with { type: 'json' };

const pages = [
  { path: '/', name: 'home', status: 200 },
  { path: '/services/', name: 'services', status: 200 },
  { path: '/contact/', name: 'contact', status: 200 },
  { path: '/missing-page/', name: '404', status: 404 },
];

// Deterministic widget lifecycle coverage supplements the real dummy-key checks.
async function stubRevealWidget(page: Page, firstOutcome = 'pass') {
  await page.route(
    'https://challenges.cloudflare.com/turnstile/v0/api.js*',
    (route) =>
      route.fulfill({
        contentType: 'application/javascript',
        body: `
        const widgets = new Map();
        let nextId = 0;
        let revealAttempt = 0;
        window.turnstile = {
          render(container, options) {
            const id = String(++nextId);
            widgets.set(id, options);
            container.dataset.appearance = options.appearance || 'always';
            return id;
          },
          execute(id) {
            const options = widgets.get(id);
            const attempt = ++revealAttempt;
            const outcome = attempt === 1 ? ${JSON.stringify(firstOutcome)} : 'pass';
            if (outcome === 'stalled') return;
            setTimeout(() => {
              if (outcome === 'pass') {
                options.callback('test-token-' + attempt);
                options.callback('test-token-' + attempt);
                options['expired-callback']();
              } else {
                options[outcome + '-callback']();
                // A late callback from a failed widget must never reveal details.
                options.callback('stale-token');
              }
            }, 30);
          },
          remove(id) { widgets.delete(id); },
          reset() {}
        };
      `,
      }),
  );
}

const syntheticDetails = {
  ok: true,
  email: 'contact@example.test',
  phone: '+1 202 555 0100',
};

test('initial verification reveals both details without a click or focus change', async ({
  page,
}) => {
  // This uses Cloudflare's real pass widget and the server's siteverify path.
  let requests = 0;
  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/api/contact') requests++;
  });
  await page.goto('/contact/');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await skip.focus();
  const section = page.locator('[data-contact-reveal]');
  await expect(section.locator('[data-reveal-retry]')).toBeHidden();
  await expect(
    section.getByRole('link', { name: syntheticDetails.email }),
  ).toHaveAttribute('href', 'mailto:contact@example.test', { timeout: 30_000 });
  await expect(
    section.getByRole('link', { name: syntheticDetails.phone }),
  ).toHaveAttribute('href', 'tel:+12025550100');
  await expect(section.locator('[data-reveal-retry]')).toBeHidden();
  await expect(section.locator('[data-reveal-widget]')).toBeHidden();
  await expect(skip).toBeFocused();
  expect(requests).toBe(1);
});

for (const outcome of [
  'error',
  'expired',
  'timeout',
  'unsupported',
  'stalled',
]) {
  test(`passive ${outcome} offers a keyboard retry and consumes one fresh token`, async ({
    page,
  }) => {
    await stubRevealWidget(page, outcome);
    const tokens: string[] = [];
    await page.route('**/api/contact', (route) => {
      tokens.push(route.request().postDataJSON().token);
      return route.fulfill({ json: syntheticDetails });
    });
    if (outcome === 'stalled') await page.clock.install();
    await page.goto('/contact/');
    const section = page.locator('[data-contact-reveal]');
    const retry = section.getByRole('button', {
      name: 'Verify with Cloudflare Turnstile',
    });
    if (outcome === 'stalled') {
      await expect(section.locator('[data-reveal-widget]')).toHaveAttribute(
        'data-appearance',
        'interaction-only',
      );
      await page.clock.fastForward(31_000);
    }
    await expect(retry).toBeVisible();
    await expect(section.locator('[data-contact-details]')).toBeHidden();
    expect(tokens).toEqual([]);
    await retry.focus();
    await retry.press('Enter');
    const email = section.getByRole('link', { name: syntheticDetails.email });
    await expect(email).toBeVisible();
    await expect(
      section.getByRole('link', { name: syntheticDetails.phone }),
    ).toBeVisible();
    await expect(retry).toBeHidden();
    await expect(email).toBeFocused();
    await expect(section.locator('[data-reveal-widget]')).toHaveAttribute(
      'data-appearance',
      'always',
    );
    expect(tokens).toEqual(['test-token-2']);
  });
}

test('server rejection exposes no contacts and retry uses a new token', async ({
  page,
}) => {
  await stubRevealWidget(page);
  const tokens: string[] = [];
  await page.route('**/api/contact', (route) => {
    tokens.push(route.request().postDataJSON().token);
    return route.fulfill(
      tokens.length === 1
        ? {
            status: 400,
            json: {
              ok: false,
              message:
                'Verification expired or was already used. Please verify again and retry.',
            },
          }
        : { json: syntheticDetails },
    );
  });
  await page.goto('/contact/');
  const section = page.locator('[data-contact-reveal]');
  await expect(section.locator('[data-status]')).toContainText(
    'Verification expired',
  );
  await expect(section.locator('[data-contact-details]')).toBeHidden();
  await section
    .getByRole('button', { name: 'Verify with Cloudflare Turnstile' })
    .click();
  await expect(
    section.getByRole('link', { name: syntheticDetails.email }),
  ).toBeVisible();
  expect(tokens).toEqual(['test-token-1', 'test-token-2']);
});

test('a blocked widget script offers retry without exposing contact details', async ({
  page,
}) => {
  await page.route(
    'https://challenges.cloudflare.com/turnstile/v0/api.js*',
    (route) => route.abort(),
  );
  await page.goto('/');
  const section = page.locator('[data-contact-reveal]');
  await expect(section.locator('[data-reveal-retry]')).toBeVisible();
  await expect(section.locator('[data-status]')).toContainText(
    'Verification could not connect',
  );
  await expect(section.locator('[data-contact-details]')).toBeHidden();
});

test('a contact API network failure preserves the manual retry', async ({
  page,
}) => {
  await stubRevealWidget(page);
  await page.route('**/api/contact', (route) => route.abort());
  await page.goto('/');
  const section = page.locator('[data-contact-reveal]');
  await expect(section.locator('[data-reveal-retry]')).toBeVisible();
  await expect(section.locator('[data-status]')).toContainText(
    'We could not load our contact details',
  );
  await expect(section.locator('[data-contact-details]')).toBeHidden();
});

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

test('one verified request returns both synthetic contacts with no-store', async ({
  request,
}) => {
  const response = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:8797' },
    data: { token: 'XXXX.DUMMY.TOKEN.XXXX' },
  });
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe('no-store');
  expect(await response.json()).toEqual(syntheticDetails);
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

test('a verified submission is accepted by the local email binding', async ({
  request,
}) => {
  const response = await request.post('/api/submit', {
    headers: { Origin: 'http://localhost:8797' },
    data: {
      name: 'Local test visitor',
      email: 'visitor@example.test',
      message: 'Synthetic local enquiry. No real email should be sent.',
      website: '',
      token: 'XXXX.DUMMY.TOKEN.XXXX',
    },
  });
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe('no-store');
  expect(await response.json()).toEqual({
    ok: true,
    message:
      'Your enquiry has been sent. Thank you for telling us about your project.',
  });
});

test('successful form delivery confirms inline and clears the enquiry', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page
    .getByLabel('Your name', { exact: true })
    .fill('Local test visitor');
  await page
    .getByLabel('Your email address', { exact: true })
    .fill('visitor@example.test');
  await page
    .getByLabel('About your project', { exact: true })
    .fill('Synthetic form delivery test. No real email should be sent.');
  await page.locator('[data-form-widget]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-contact-form] [role=status]')).toContainText(
    'Verification complete',
    { timeout: 30_000 },
  );
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.locator('[data-contact-form] [role=status]')).toContainText(
    'Your enquiry has been sent',
  );
  await expect(page.getByLabel('Your name', { exact: true })).toHaveValue('');
  await expect(
    page.getByLabel('About your project', { exact: true }),
  ).toHaveValue('');
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
