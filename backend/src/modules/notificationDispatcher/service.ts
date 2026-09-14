import type { NotificationDeliveryRepository } from './repository';
import type { NotificationQueue } from './queue';
import type { NotificationDelivery, NotificationDeliveryDraft, NotificationQueueJob } from './types';

export function toQueueJob(delivery: NotificationDelivery): NotificationQueueJob {
  return {
    deliveryId: delivery.id,
    to: delivery.recipientEmail,
    subject: delivery.subject,
    html: delivery.html,
    notificationId: delivery.notificationId,
  };
}

export async function createNotificationDeliveries(
  repository: NotificationDeliveryRepository,
  deliveries: readonly NotificationDeliveryDraft[],
) {
  if (deliveries.length === 0) {
    return [];
  }

  return repository.createQueuedDeliveries(deliveries);
}

export async function relayCommittedNotificationDeliveries(
  repository: NotificationDeliveryRepository,
  queue: NotificationQueue,
  limit: number,
) {
  const deliveries = await repository.findQueuedDeliveries(limit);
  const results = [];

  for (const delivery of deliveries) {
    try {
      await queue.publish(toQueueJob(delivery));
      await repository.markPublished(delivery.id);
      results.push({ deliveryId: delivery.id, ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await repository.markFailed(delivery.id, message);
      results.push({ deliveryId: delivery.id, ok: false, error: message });
    }
  }

  return results;
}
