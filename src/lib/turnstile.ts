import { z } from 'astro/zod';
import messages from '../content/messages.json' with { type: 'json' };
import { localDevelopment, RequestError } from './http';

const verificationSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
  'error-codes': z.array(z.string()).optional(),
  metadata: z
    .object({ result_with_testing_key: z.boolean().optional() })
    .optional(),
});
const dummySecrets = new Set([
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA',
]);

export async function verifyTurnstile(
  request: Request,
  env: Cloudflare.Env,
  token: unknown,
  action: 'contact' | 'reveal',
) {
  if (typeof token !== 'string' || !token || token.length > 2048) {
    throw new RequestError(400, messages.tokenMissing);
  }
  const secret =
    action === 'contact'
      ? env.TURNSTILE_SECRET_KEY
      : env.TURNSTILE_REVEAL_SECRET_KEY;
  const dummy = dummySecrets.has(secret);
  if (!secret || (dummy && !localDevelopment(request, env))) {
    throw new RequestError(503, messages.unavailable);
  }
  let result: z.infer<typeof verificationSchema>;
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: request.headers.get('CF-Connecting-IP') || undefined,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) throw new Error('siteverify unavailable');
    result = verificationSchema.parse(await response.json());
  } catch {
    throw new RequestError(503, messages.tokenUnavailable);
  }
  if (!result.success) {
    throw new RequestError(
      400,
      result['error-codes']?.includes('timeout-or-duplicate')
        ? messages.tokenExpired
        : messages.tokenInvalid,
    );
  }
  // Dummy tokens have a fixed hostname and no issued action. This exact response
  // is accepted only with documented dummy keys on a local development host.
  if (
    dummy &&
    token === 'XXXX.DUMMY.TOKEN.XXXX' &&
    result.hostname === 'example.com' &&
    result.action === undefined &&
    result.metadata?.result_with_testing_key === true
  )
    return;
  const allowed = env.ALLOWED_HOSTNAMES.split(',').map((hostname) =>
    hostname.trim(),
  );
  if (
    !result.hostname ||
    !allowed.includes(result.hostname) ||
    result.hostname !== new URL(request.url).hostname ||
    result.action !== action
  ) {
    throw new RequestError(400, messages.tokenInvalid);
  }
}
