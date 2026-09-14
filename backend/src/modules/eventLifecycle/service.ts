import { validateEventStatusTransition } from './status';
import type { EventLifecycleRepository } from './repository';
import type { StatusChangeRequest } from './types';

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
