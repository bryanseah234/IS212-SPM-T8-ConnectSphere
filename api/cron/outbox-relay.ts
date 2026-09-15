import { runtimeConfig } from '../../backend/src/config.js';
import { hasInternalSecret, requireMethod, sendJson } from '../../backend/src/http.js';
import { notificationDatabase } from '../../backend/src/database/pool.js';
import { publishCommittedDeliveries } from '../../backend/src/modules/notificationDispatcher/dispatch.js';
import { postgresDeliveryStore } from '../../backend/src/modules/notificationDispatcher/postgres.js';
import { createDeliveryTransport } from '../../backend/src/providers/durableRedis.js';
import type { VercelRequest, VercelResponse } from '../../backend/src/vercel.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!requireMethod(request, response, 'GET')) {
    return;
  }

  if (!hasInternalSecret(request, runtimeConfig.cronSecret)) {
    sendJson(response, 401, { error: 'unauthorized' });
    return;
  }

  if (process.env.NOTIFICATION_RELAY_ENABLED !== 'true') {
    sendJson(response, 503, { error: 'notification_relay_not_enabled' });
    return;
  }
  try {
    const result = await publishCommittedDeliveries(postgresDeliveryStore(notificationDatabase()), createDeliveryTransport());
    sendJson(response, 200, result);
  } catch {
    sendJson(response, 503, { error: 'notification_relay_unavailable' });
  }
}
