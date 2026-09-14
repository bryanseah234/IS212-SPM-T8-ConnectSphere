export type NotificationChannel = 'email';

export type NotificationDeliveryStatus = 'queued' | 'published' | 'sent' | 'failed';

export type NotificationDeliveryDraft = {
  notificationId?: string;
  eventId?: string;
  recipientUserId?: string;
  recipientEmail: string;
  channel: NotificationChannel;
  subject: string;
  html: string;
};

export type NotificationDelivery = NotificationDeliveryDraft & {
  id: string;
  deliveryStatus: NotificationDeliveryStatus;
  createdAt: Date;
};

export type NotificationQueueJob = {
  deliveryId: string;
  to: string;
  subject: string;
  html: string;
  notificationId?: string;
};
