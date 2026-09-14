import type { AuditLogRepository } from './repository';
import type { AuditEntryDraft } from './types';

export function buildStatusChangeAuditEntry(input: {
  actorId: string;
  eventId: string;
  fromStatus: string;
  toStatus: string;
  reason?: string;
}): AuditEntryDraft {
  return {
    actorId: input.actorId,
    module: 'eventLifecycle',
    action: 'status_changed',
    entityType: 'event',
    entityId: input.eventId,
    eventId: input.eventId,
    message: `Event status changed from ${input.fromStatus} to ${input.toStatus}`,
    metadata: {
      fromStatus: input.fromStatus,
      toStatus: input.toStatus,
      reason: input.reason,
    },
  };
}

export async function appendAuditEntry(repository: AuditLogRepository, entry: AuditEntryDraft) {
  return repository.append(entry);
}
