import { z } from 'astro/zod';
import messages from '../content/messages.json';
import { RequestError } from './http';

const plainText = (value: string, multiline = false) =>
  Array.from(value).every((character) => {
    const code = character.codePointAt(0)!;
    return (
      (code >= 32 && code !== 127) || (multiline && [9, 10, 13].includes(code))
    );
  });
const singleLine = (value: string) => plainText(value);
const fields = z.object({
  name: z.string().trim().min(1).max(120).refine(singleLine),
  email: z.string().trim().max(254).pipe(z.email()).refine(singleLine),
  message: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .refine((value) => plainText(value, true)),
});
export type Submission = z.infer<typeof fields>;
const envelope = fields
  .extend({
    token: z.string().min(1).max(2048),
    website: z.string().max(0),
  })
  .strict();

export function validateSubmission(body: unknown) {
  if (
    typeof body === 'object' &&
    body !== null &&
    'website' in body &&
    body.website !== ''
  ) {
    throw new RequestError(400, messages.honeypot);
  }
  const result = envelope.safeParse(body);
  if (result.success) return { ok: true as const, data: result.data };
  const fieldErrors: Partial<Record<keyof Submission, string>> = {};
  const hints = {
    name: messages.nameInvalid,
    email: messages.emailInvalid,
    message: messages.messageInvalid,
  };
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field === 'name' || field === 'email' || field === 'message')
      fieldErrors[field] = hints[field];
  }
  return {
    ok: false as const,
    fields: fieldErrors,
    message: Object.keys(fieldErrors).length
      ? messages.fieldsInvalid
      : messages.tokenMissing,
  };
}
