import type { NotificationQueueJob } from './types.js';

export type NotificationQueue = {
  publish(job: NotificationQueueJob): Promise<void>;
};
