import type { EventStatus } from './status.js';

export type EventRecord = {
  id: string;
  title: string;
  description?: string;
  purpose?: string;
  clientOrgId: string;
  organiserId: string;
  coordinatorId?: string;
  status: EventStatus;
  statusChangedAt: Date;
  startAt?: Date;
  endAt?: Date;
  expectedAttendance?: number;
  layoutId?: string;
  accessibilityNote?: string;
};

export type StatusChangeRequest = {
  eventId: string;
  actorId: string;
  toStatus: EventStatus;
  reason?: string;
};

export type CreateEventRequest = {
  title: string;
  description?: string;
  purpose?: string;
  organiserId: string;
  clientOrgId: string;
  status?: Extract<EventStatus, 'draft' | 'submitted'>;
  startAt: Date;
  endAt: Date;
  expectedAttendance: number;
  layoutId?: string;
  accessibilityNote?: string;
};
