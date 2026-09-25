import { test, expect } from '@playwright/test';
import { guardRequest, readJson, errorResponse } from '../src/lib/http';
import { verifyTurnstile } from '../src/lib/turnstile';
import { validateSubmission } from '../src/lib/submission';
import { deliverSubmission } from '../src/lib/email';

const host = 'contractor.example';
const request = (
  body = '{}',
  headers: Record<string, string> = {},
  method = 'POST',
) =>
  new Request(`https://${host}/api/submit`, {
    method,
    ...(method === 'POST' ? { body } : {}),
    headers: {
      Origin: `https://${host}`,
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '192.0.2.1',
      ...headers,
    },
  });
const env = () =>
  ({
    APP_ENV: 'production',
    ALLOWED_HOSTNAMES: host,
    TURNSTILE_SECRET_KEY: 'synthetic-contact-secret',
    TURNSTILE_REVEAL_SECRET_KEY: 'synthetic-reveal-secret',
    API_RATE_LIMITER: { limit: async () => ({ success: true }) },
    SUBMIT_RATE_LIMITER: { limit: async () => ({ success: true }) },
  }) as unknown as Cloudflare.Env;
const nativeFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = nativeFetch;
});
const reply = (data: unknown, status = 200) => {
  globalThis.fetch = async () => Response.json(data, { status });
};
const status = async (task: () => Promise<unknown>) => {
  try {
    await task();
    return 200;
  } catch (error) {
    return errorResponse(error).status;
  }
};

test('email notifications use the configured inbox and escape visitor content', async () => {
  let sent: unknown;
  const settings = {
    EMAIL: {
      send: async (message: unknown) => {
        sent = message;
        return { messageId: 'local-notification' };
      },
    },
    EMAIL_FROM: 'website@example.test',
    FORM_DESTINATION: 'delivery@example.test',
  };
  await deliverSubmission(settings, {
    name: 'Renée <Visitor>',
    email: 'visitor@example.test',
    message: 'Kitchen & entry\n<script>alert("example")</script>',
  });
  expect(sent).toMatchObject({
    to: settings.FORM_DESTINATION,
    from: { email: settings.EMAIL_FROM, name: 'RC General Contracting Inc' },
    replyTo: { email: 'visitor@example.test', name: 'Renée <Visitor>' },
    subject: 'New website enquiry',
  });
  const body = sent as EmailMessageBuilder;
  expect(body.text).toContain('Kitchen & entry\n<script>');
  expect(body.html).toContain('Renée &lt;Visitor&gt;');
  expect(body.html).toContain('Kitchen &amp; entry<br>&lt;script&gt;');
  expect(body.html).not.toContain('<script>');
  expect(body).not.toHaveProperty('cc');
  expect(body).not.toHaveProperty('bcc');
});

test('email delivery waits for provider acceptance and rejects failures', async () => {
  let accept!: (value: EmailSendResult) => void;
  let completed = false;
  const settings = {
    EMAIL: {
      send: () =>
        new Promise<EmailSendResult>((resolve) => {
          accept = resolve;
        }),
    },
    EMAIL_FROM: 'website@example.test',
    FORM_DESTINATION: 'delivery@example.test',
  };
  const submission = {
    name: 'Visitor',
    email: 'visitor@example.test',
    message: 'Test enquiry',
  };
  const pending = deliverSubmission(settings, submission).then(() => {
    completed = true;
  });
  await Promise.resolve();
  expect(completed).toBe(false);
  accept({ messageId: 'accepted-locally' });
  await pending;
  expect(completed).toBe(true);
  for (const send of [
    async () => {
      throw new Error('Private provider detail: delivery@example.test');
    },
    async () => ({ messageId: '' }),
  ]) {
    const result = await status(() =>
      deliverSubmission({ ...settings, EMAIL: { send } }, submission),
    );
    expect(result).toBe(503);
  }
});

test('missing or invalid email configuration cannot produce a success', async () => {
  let calls = 0;
  const settings = {
    EMAIL: {
      send: async () => {
        calls++;
        return { messageId: 'unused' };
      },
    },
    EMAIL_FROM: 'website@example.test',
    FORM_DESTINATION: 'delivery@example.test',
  };
  const submission = {
    name: 'Visitor',
    email: 'visitor@example.test',
    message: 'Test enquiry',
  };
  for (const change of [
    { EMAIL_FROM: '' },
    { FORM_DESTINATION: '' },
    { EMAIL_FROM: 'sender@example.test\r\nBcc: other@example.test' },
  ]) {
    expect(
      await status(() =>
        deliverSubmission({ ...settings, ...change }, submission),
      ),
    ).toBe(503);
  }
  expect(calls).toBe(0);
});

test('siteverify sends the secret, token and connecting IP, and enforces action', async () => {
  for (const action of ['contact', 'reveal'] as const) {
    let payload: unknown;
    globalThis.fetch = async (url, init) => {
      expect(url).toBe(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      );
      payload = JSON.parse(String(init?.body));
      return Response.json({ success: true, hostname: host, action });
    };
    await verifyTurnstile(request(), env(), 'one-use-token', action);
    expect(payload).toEqual({
      secret: `synthetic-${action}-secret`,
      response: 'one-use-token',
      remoteip: '192.0.2.1',
    });
  }
});

test('rejects invalid, reused, expired, cross-host and cross-action tokens', async () => {
  for (const response of [
    { success: false },
    { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'evil.example', action: 'contact' },
    { success: true, hostname: host, action: 'reveal' },
    { success: true, hostname: host },
  ]) {
    reply(response);
    expect(
      await status(() => verifyTurnstile(request(), env(), 'token', 'contact')),
    ).toBe(400);
  }
  reply({ success: true, hostname: host, action: 'contact' });
  await verifyTurnstile(request(), env(), 'token', 'contact');
  reply({ success: false, 'error-codes': ['timeout-or-duplicate'] });
  await expect(
    verifyTurnstile(request(), env(), 'token', 'contact'),
  ).rejects.toThrow('expired or was already used');
});

test('never accepts dummy keys on production hosts', async () => {
  const settings = env();
  settings.TURNSTILE_SECRET_KEY = '1x0000000000000000000000000000000AA';
  reply({
    success: true,
    hostname: 'example.com',
    metadata: { result_with_testing_key: true },
  });
  expect(
    await status(() =>
      verifyTurnstile(request(), settings, 'XXXX.DUMMY.TOKEN.XXXX', 'contact'),
    ),
  ).toBe(503);
  settings.APP_ENV = 'development';
  expect(
    await status(() =>
      verifyTurnstile(request(), settings, 'XXXX.DUMMY.TOKEN.XXXX', 'contact'),
    ),
  ).toBe(503);
});

test('fails safely when siteverify is unavailable or malformed', async () => {
  for (const data of [{}, { success: 'true' }]) {
    reply(data);
    expect(
      await status(() => verifyTurnstile(request(), env(), 'token', 'contact')),
    ).toBe(503);
  }
  globalThis.fetch = async () => {
    throw new Error('network');
  };
  expect(
    await status(() => verifyTurnstile(request(), env(), 'token', 'contact')),
  ).toBe(503);
});

test('Cloudflare dummy pass and fail secrets exercise the real verification service', async () => {
  const settings = env();
  settings.APP_ENV = 'development';
  settings.ALLOWED_HOSTNAMES = 'localhost';
  const local = new Request('http://localhost:8797/api/submit');
  settings.TURNSTILE_SECRET_KEY = '1x0000000000000000000000000000000AA';
  await verifyTurnstile(local, settings, 'XXXX.DUMMY.TOKEN.XXXX', 'contact');
  settings.TURNSTILE_SECRET_KEY = '2x0000000000000000000000000000000AA';
  expect(
    await status(() =>
      verifyTurnstile(local, settings, 'XXXX.DUMMY.TOKEN.XXXX', 'contact'),
    ),
  ).toBe(400);
  settings.TURNSTILE_SECRET_KEY = '3x0000000000000000000000000000000AA';
  await expect(
    verifyTurnstile(local, settings, 'XXXX.DUMMY.TOKEN.XXXX', 'contact'),
  ).rejects.toThrow('expired or was already used');
});

test('rejects unsafe origins, methods and content types', async () => {
  expect(
    await status(() => guardRequest(request('{}', {}, 'GET'), env())),
  ).toBe(405);
  expect(
    await status(() =>
      guardRequest(request('{}', { Origin: 'https://evil.example' }), env()),
    ),
  ).toBe(403);
  expect(
    await status(() =>
      guardRequest(request('{}', { 'Content-Type': 'text/plain' }), env()),
    ),
  ).toBe(415);
  expect(
    await status(() =>
      guardRequest(request('{}', { 'CF-Connecting-IP': '' }), env()),
    ),
  ).toBe(403);
});

test('enforces both rate limits and returns a retry interval', async () => {
  for (const binding of ['API_RATE_LIMITER', 'SUBMIT_RATE_LIMITER'] as const) {
    const settings = env();
    settings[binding] = { limit: async () => ({ success: false }) };
    try {
      await guardRequest(request(), settings, true);
      throw new Error('Rate limit was ignored');
    } catch (error) {
      const response = errorResponse(error);
      expect(response.status).toBe(429);
      expect(response.headers.get('Retry-After')).toBe('60');
    }
  }
});

test('rejects oversized streamed bodies and malformed JSON', async () => {
  expect(await status(() => readJson(request('x'.repeat(33_000))))).toBe(413);
  expect(
    await status(() => readJson(request('{}', { 'Content-Length': '33000' }))),
  ).toBe(413);
  expect(await status(() => readJson(request('{invalid')))).toBe(400);
  expect(await readJson(request('{"message":"été 日本語 🏠"}'))).toEqual({
    message: 'été 日本語 🏠',
  });
});

test('validates every field and rejects honeypots, unknown fields and header injection', () => {
  const valid = {
    name: 'Renée Example',
    email: 'visitor@example.test',
    message: 'A renovation\nWith accessible entry.',
    website: '',
    token: 'token',
  };
  expect(validateSubmission(valid).ok).toBe(true);
  for (const changed of [
    { name: '' },
    { name: 'a'.repeat(121) },
    { name: 'A\r\nBcc: victim' },
    { email: 'invalid' },
    { message: '' },
    { message: 'x'.repeat(5001) },
    { website: 'spam' },
    { token: '' },
    { unrecognized: 'field' },
  ]) {
    try {
      expect(validateSubmission({ ...valid, ...changed }).ok).toBe(false);
    } catch (error) {
      if ('website' in changed) expect(errorResponse(error).status).toBe(400);
      else throw error;
    }
  }
});
