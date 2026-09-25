import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { z } from 'astro/zod';
import messages from '../../content/messages.json' with { type: 'json' };
import {
  guardRequest,
  readJson,
  jsonResponse,
  errorResponse,
  RequestError,
} from '../../lib/http';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;
const revealSchema = z
  .object({
    token: z.string().min(1).max(2048),
    // Keep the single-detail contract for visitors with an older cached page.
    kind: z.enum(['email', 'phone']).optional(),
  })
  .strict();

export const ALL: APIRoute = async ({ request }) => {
  try {
    await guardRequest(request, env);
    const parsed = revealSchema.safeParse(await readJson(request, 4096));
    if (!parsed.success) throw new RequestError(400, messages.bodyInvalid);
    await verifyTurnstile(request, env, parsed.data.token, 'reveal');
    if (!parsed.data.kind) {
      if (!env.CONTACT_EMAIL || !env.CONTACT_PHONE)
        throw new RequestError(503, messages.unavailable);
      return jsonResponse({
        ok: true,
        email: env.CONTACT_EMAIL,
        phone: env.CONTACT_PHONE,
      });
    }
    const value =
      parsed.data.kind === 'email' ? env.CONTACT_EMAIL : env.CONTACT_PHONE;
    if (!value) throw new RequestError(503, messages.unavailable);
    return jsonResponse({ ok: true, kind: parsed.data.kind, value });
  } catch (error) {
    return errorResponse(error);
  }
};
