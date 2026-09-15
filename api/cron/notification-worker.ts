import { requireEnv, runtimeConfig } from '../../backend/src/config.js';
import { hasInternalSecret, requireMethod, sendJson } from '../../backend/src/http.js';
import { notificationDatabase } from '../../backend/src/database/pool.js';
import { dispatchCommittedDeliveries } from '../../backend/src/modules/notificationDispatcher/dispatch.js';
import { postgresDeliveryStore } from '../../backend/src/modules/notificationDispatcher/postgres.js';
import { createDeliveryTransport } from '../../backend/src/providers/durableRedis.js';
import { sendDurableBrevoEmail } from '../../backend/src/providers/brevo.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) return;
  if (!hasInternalSecret(request, runtimeConfig.cronSecret)) {
    sendJson(response, 401, { error: 'unauthorized' }); return;
  }
  if (process.env.NOTIFICATION_DELIVERY_ENABLED !== 'true') {
    sendJson(response, 503, { error: 'notification_delivery_not_enabled' }); return;
  }
  try {
    requireEnv(runtimeConfig.brevoApiKey, 'BREVO_API_KEY');
    requireEnv(runtimeConfig.emailFrom, 'EMAIL_FROM');
    const result = await dispatchCommittedDeliveries(
      postgresDeliveryStore(notificationDatabase()), createDeliveryTransport(), sendDurableBrevoEmail,
    );
    sendJson(response, 200, result);
  } catch {
    sendJson(response, 503, { error: 'notification_worker_unavailable' });
  }
}
