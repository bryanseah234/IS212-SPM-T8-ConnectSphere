import type { NotificationDelivery, NotificationDeliveryDraft } from './types';

export type NotificationDeliveryRepository = {
  createQueuedDeliveries(deliveries: readonly NotificationDeliveryDraft[]): Promise<NotificationDelivery[]>;
  findQueuedDeliveries(limit: number): Promise<NotificationDelivery[]>;
  markPublished(deliveryId: string): Promise<void>;
  markFailed(deliveryId: string, errorMessage: string): Promise<void>;
};
