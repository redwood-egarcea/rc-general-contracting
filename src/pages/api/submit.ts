import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import messages from '../../content/messages.json' with { type: 'json' };
import {
  guardRequest,
  readJson,
  jsonResponse,
  errorResponse,
} from '../../lib/http';
import { deliverSubmission } from '../../lib/email';
import { validateSubmission } from '../../lib/submission';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  try {
    await guardRequest(request, env, true);
    const submission = validateSubmission(await readJson(request));
    if (!submission.ok) return jsonResponse(submission, 400);
    await verifyTurnstile(request, env, submission.data.token, 'contact');
    await deliverSubmission(env, submission.data);
    return jsonResponse({ ok: true, message: messages.delivered });
  } catch (error) {
    return errorResponse(error);
  }
};
