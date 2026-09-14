import { runtimeConfig } from '../../backend/src/config.js';
import { hasInternalSecret, requireMethod, sendJson } from '../../backend/src/http.js';
import { sendBrevoEmail } from '../../backend/src/providers/brevo.js';
import { dequeueEmailBatch } from '../../backend/src/providers/redisQueue.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) {
    return;
  }

  if (!hasInternalSecret(request, runtimeConfig.cronSecret)) {
    sendJson(response, 401, { error: 'unauthorized' });
    return;
  }

  const jobs = await dequeueEmailBatch(5);
  const results = [];

  for (const job of jobs) {
    try {
      const providerResult = await sendBrevoEmail(job);
      results.push({
        notificationId: job.notificationId,
        ok: true,
        providerResult,
      });
    } catch (error) {
      results.push({
        notificationId: job.notificationId,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  sendJson(response, 200, {
    processed: results.length,
    results,
  });
}
