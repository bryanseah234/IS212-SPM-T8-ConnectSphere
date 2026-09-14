import type { NotificationQueueJob } from './types';

export type NotificationQueue = {
  publish(job: NotificationQueueJob): Promise<void>;
};
