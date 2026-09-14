import { runtimeConfig } from '../../backend/src/config';
import { hasInternalSecret, requireMethod, sendJson } from '../../backend/src/http';
import { enqueueEmail } from '../../backend/src/providers/redisQueue';
import type { EmailJob } from '../../backend/src/providers/brevo';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel';

function parseEmailJob(body: unknown): EmailJob | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const payload = body as Partial<EmailJob>;
  if (!payload.to || !payload.subject || !payload.html) {
    return null;
  }

  return {
    to: String(payload.to),
    subject: String(payload.subject),
    html: String(payload.html),
    notificationId: payload.notificationId ? String(payload.notificationId) : undefined,
  };
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'POST')) {
    return;
  }

  if (!hasInternalSecret(request, runtimeConfig.cronSecret)) {
    sendJson(response, 401, { error: 'unauthorized' });
    return;
  }

  const job = parseEmailJob(request.body);
  if (!job) {
    sendJson(response, 400, {
      error: 'invalid_payload',
      required: ['to', 'subject', 'html'],
    });
    return;
  }

  const queueLength = await enqueueEmail(job);
  sendJson(response, 202, {
    queued: true,
    queue: runtimeConfig.notificationQueueName,
    queueLength,
  });
}
