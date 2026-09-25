import { z } from 'astro/zod';
import messages from '../content/messages.json' with { type: 'json' };
import site from '../content/site.json' with { type: 'json' };
import { RequestError } from './http';
import type { Submission } from './submission';

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

export async function deliverSubmission(
  env: Pick<Cloudflare.Env, 'EMAIL' | 'EMAIL_FROM' | 'FORM_DESTINATION'>,
  submission: Submission,
) {
  if (
    !env.EMAIL ||
    !z.email().safeParse(env.EMAIL_FROM).success ||
    !z.email().safeParse(env.FORM_DESTINATION).success
  ) {
    throw new RequestError(503, messages.deliveryFailed);
  }
  const copy = messages.notification;
  // Recipients and sender come only from Worker configuration. The visitor's
  // address is Reply-To, so a reply reaches them without impersonating them.
  const email: EmailMessageBuilder = {
    to: env.FORM_DESTINATION,
    from: { email: env.EMAIL_FROM, name: site.name },
    replyTo: { email: submission.email, name: submission.name },
    subject: copy.subject,
    text: `${copy.name}: ${submission.name}\n${copy.email}: ${submission.email}\n\n${copy.message}:\n${submission.message}`,
    html: `<h1>${escapeHtml(copy.subject)}</h1><p><strong>${escapeHtml(copy.name)}:</strong> ${escapeHtml(submission.name)}<br><strong>${escapeHtml(copy.email)}:</strong> ${escapeHtml(submission.email)}</p><h2>${escapeHtml(copy.message)}</h2><p>${escapeHtml(submission.message).replace(/\r\n?|\n/g, '<br>')}</p>`,
  };
  try {
    const result = await env.EMAIL.send(email);
    if (typeof result?.messageId !== 'string' || !result.messageId)
      throw new Error('Email was not accepted');
  } catch {
    // Provider errors can contain addresses or message text. Keep them private.
    console.error(JSON.stringify({ event: 'contact_delivery_failed' }));
    throw new RequestError(503, messages.deliveryFailed);
  }
}
