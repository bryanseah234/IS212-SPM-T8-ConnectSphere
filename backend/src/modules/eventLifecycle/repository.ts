import type { EventRecord } from './types.js';

export type EventLifecycleRepository = {
  findEventById(eventId: string): Promise<EventRecord | null>;
  updateEventStatus(eventId: string, status: EventRecord['status'], reason?: string): Promise<EventRecord>;
};
