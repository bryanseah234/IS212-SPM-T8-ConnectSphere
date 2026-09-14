import { validateEventStatusTransition } from './status.js';
import type { EventLifecycleRepository } from './repository.js';
import type { CreateEventRequest, StatusChangeRequest } from './types.js';

export class EventValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EventValidationError';
  }
}

export async function createEventRequest(
  repository: EventLifecycleRepository,
  request: CreateEventRequest,
) {
  if (!request.title.trim()) {
    throw new EventValidationError('title_required');
  }

  if (request.endAt.getTime() <= request.startAt.getTime()) {
    throw new EventValidationError('invalid_event_range');
  }

  if (!Number.isInteger(request.expectedAttendance) || request.expectedAttendance <= 0) {
    throw new EventValidationError('invalid_expected_attendance');
  }

  if (request.status && !['draft', 'submitted'].includes(request.status)) {
    throw new EventValidationError('invalid_initial_status');
  }

  return repository.createEvent({
    ...request,
    title: request.title.trim(),
    description: request.description?.trim() || undefined,
    purpose: request.purpose?.trim() || undefined,
    accessibilityNote: request.accessibilityNote?.trim() || undefined,
  });
}

export async function changeEventStatus(
  repository: EventLifecycleRepository,
  request: StatusChangeRequest,
) {
  const event = await repository.findEventById(request.eventId);
  if (!event) {
    throw new Error(`Event not found: ${request.eventId}`);
  }

  const transition = validateEventStatusTransition(event.status, request.toStatus);
  if (!transition.allowed) {
    throw new Error(`Illegal event status transition: ${event.status} -> ${request.toStatus}`);
  }

  return repository.updateEventStatus(request.eventId, request.toStatus, request.reason);
}
