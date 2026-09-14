import type { ModuleKey } from '../shared/moduleRegistry';

export type AuditAction =
  | 'access_denied'
  | 'status_changed'
  | 'booking_decision'
  | 'user_deactivated'
  | 'record_created'
  | 'record_updated';

export type AuditEntryDraft = {
  actorId?: string;
  module: ModuleKey;
  action: AuditAction;
  entityType: string;
  entityId: string;
  eventId?: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export type AuditEntry = AuditEntryDraft & {
  id: string;
  createdAt: Date;
};
