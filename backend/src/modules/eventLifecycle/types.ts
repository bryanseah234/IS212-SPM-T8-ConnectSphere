import type { EventStatus } from './status';

export type EventRecord = {
  id: string;
  title: string;
  clientOrgId: string;
  organiserId: string;
  coordinatorId?: string;
  status: EventStatus;
  statusChangedAt: Date;
};

export type StatusChangeRequest = {
  eventId: string;
  actorId: string;
  toStatus: EventStatus;
  reason?: string;
};
