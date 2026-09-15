import type { AuditEntry, AuditEntryDraft } from './types.js';

export type AuditLogRepository = {
  append(entry: AuditEntryDraft): Promise<AuditEntry>;
};
