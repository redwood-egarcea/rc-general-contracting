import messages from '../content/messages.json';

export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function jsonResponse(
  data: unknown,
  status = 200,
  extra: HeadersInit = {},
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy':
        'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      ...extra,
    },
  });
}

export function localDevelopment(request: Request, env: Cloudflare.Env) {
  return (
    env.APP_ENV === 'development' &&
    ['localhost', '127.0.0.1'].includes(new URL(request.url).hostname)
  );
}

export async function guardRequest(
  request: Request,
  env: Cloudflare.Env,
  submission = false,
) {
  if (request.method !== 'POST') throw new RequestError(405, messages.method);
  const url = new URL(request.url);
  const allowed = env.ALLOWED_HOSTNAMES.split(',')
    .map((host) => host.trim())
    .filter(Boolean);
  if (
    !allowed.includes(url.hostname) ||
    request.headers.get('Origin') !== url.origin
  ) {
    throw new RequestError(403, messages.origin);
  }
  if (
    request.headers.get('Content-Type')?.split(';')[0]?.trim().toLowerCase() !==
    'application/json'
  ) {
    throw new RequestError(415, messages.contentType);
  }
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip && !localDevelopment(request, env))
    throw new RequestError(403, messages.origin);
  const key = ip || 'local-development';
  if (
    !(await env.API_RATE_LIMITER.limit({ key })).success ||
    (submission && !(await env.SUBMIT_RATE_LIMITER.limit({ key })).success)
  ) {
    throw new RequestError(429, messages.rateLimit);
  }
}

export async function readJson(
  request: Request,
  maxBytes = 32_768,
): Promise<unknown> {
  const declared = request.headers.get('Content-Length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new RequestError(413, messages.bodySize);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, messages.bodyInvalid);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError(413, messages.bodySize);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.length;
    }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body));
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError(400, messages.bodyInvalid);
  } finally {
    reader.releaseLock();
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof RequestError) {
    return jsonResponse(
      { ok: false, message: error.message },
      error.status,
      error.status === 429
        ? { 'Retry-After': '60' }
        : error.status === 405
          ? { Allow: 'POST' }
          : {},
    );
  }
  console.error(JSON.stringify({ event: 'api_failure' }));
  return jsonResponse({ ok: false, message: messages.unavailable }, 503);
}
