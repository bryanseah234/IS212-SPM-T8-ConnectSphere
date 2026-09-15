import type { NotificationDeliveryRepository } from './repository.js';
import type { NotificationDelivery, NotificationDeliveryDraft, NotificationQueueJob } from './types.js';

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

export { publishCommittedDeliveries as relayCommittedNotificationDeliveries } from './dispatch.js';
