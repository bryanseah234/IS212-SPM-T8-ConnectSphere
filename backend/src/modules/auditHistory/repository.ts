import type { AuditEntry, AuditEntryDraft } from './types';

export type AuditLogRepository = {
  append(entry: AuditEntryDraft): Promise<AuditEntry>;
};
