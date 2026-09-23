import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import messages from '../../content/messages.json';
import {
  guardRequest,
  readJson,
  jsonResponse,
  errorResponse,
  RequestError,
} from '../../lib/http';
import { validateSubmission } from '../../lib/submission';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  try {
    await guardRequest(request, env, true);
    const submission = validateSubmission(await readJson(request));
    if (!submission.ok) return jsonResponse(submission, 400);
    await verifyTurnstile(request, env, submission.data.token, 'contact');
    // TODO(setup): Connect the owner's selected, verified email provider before release.
    // A verified request must not receive a success response before delivery is accepted.
    throw new RequestError(503, messages.deliveryFailed);
  } catch (error) {
    return errorResponse(error);
  }
};
