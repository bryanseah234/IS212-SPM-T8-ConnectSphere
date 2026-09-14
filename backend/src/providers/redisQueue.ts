import { createDeliveryTransport } from './durableRedis.js';
import type { NotificationQueue } from '../modules/notificationDispatcher/index.js';
import type { NotificationQueueJob } from '../modules/notificationDispatcher/index.js';
import type { EmailJob } from './brevo.js';

// Compatibility exports fail closed: a raw email cannot bypass PostgreSQL.
export async function enqueueEmail(_job: EmailJob): Promise<never> {
  throw new Error('Use a committed PostgreSQL notification delivery');
}

export async function dequeueEmailBatch(_limit = 5): Promise<EmailJob[]> {
  throw new Error('Destructive dequeue is disabled; legacy queue contents are retained');
}

export function createRedisNotificationQueue(): NotificationQueue {
  return {
    async publish(job: NotificationQueueJob) {
      await createDeliveryTransport().publish(job.deliveryId);
    },
  };
}
