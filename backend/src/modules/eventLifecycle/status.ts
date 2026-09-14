export const EVENT_STATUSES = [
  'draft',
  'submitted',
  'under_review',
  'awaiting_clarification',
  'rejected',
  'approved',
  'planning',
  'confirmed',
  'cancelled',
  'completed',
] as const;

export type EventStatus = (typeof EVENT_STATUSES)[number];

const ALLOWED_TRANSITIONS: Record<EventStatus, readonly EventStatus[]> = {
  draft: ['submitted', 'cancelled'],
  submitted: ['under_review', 'cancelled'],
  under_review: ['awaiting_clarification', 'approved', 'rejected', 'cancelled'],
  awaiting_clarification: ['under_review', 'cancelled'],
  rejected: [],
  approved: ['planning', 'cancelled'],
  planning: ['confirmed', 'cancelled'],
  confirmed: ['planning', 'cancelled', 'completed'],
  cancelled: [],
  completed: [],
};

export type TransitionResult =
  | { allowed: true; from: EventStatus; to: EventStatus }
  | { allowed: false; from: string; to: string; reason: 'unknown_status' | 'illegal_transition' };

export function isEventStatus(value: string): value is EventStatus {
  return EVENT_STATUSES.includes(value as EventStatus);
}

export function allowedNextStatuses(status: EventStatus): readonly EventStatus[] {
  return ALLOWED_TRANSITIONS[status];
}

export function validateEventStatusTransition(from: string, to: string): TransitionResult {
  if (!isEventStatus(from) || !isEventStatus(to)) {
    return {
      allowed: false,
      from,
      to,
      reason: 'unknown_status',
    };
  }

  if (from === to || ALLOWED_TRANSITIONS[from].includes(to)) {
    return { allowed: true, from, to };
  }

  return { allowed: false, from, to, reason: 'illegal_transition' };
}
