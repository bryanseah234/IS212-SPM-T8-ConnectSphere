export type DeliveryPayload = {
  id: string;
  notificationId: string;
  to: string;
  subject: string;
  html: string;
};

export type PublishLease = { id: string; token: string };
export type SendLease = DeliveryPayload & { token: string; attempts: number };
export type SendClaim =
  | { kind: 'claimed'; lease: SendLease }
  | { kind: 'retained'; state: 'sent' | 'failed' | 'uncertain' }
  | { kind: 'busy' }
  | { kind: 'missing' };

export type SendOutcome =
  | { kind: 'sent'; messageId?: string }
  | { kind: 'retry'; code: 'provider_throttled' }
  | { kind: 'failed'; code: 'provider_rejected' }
  | { kind: 'uncertain'; code: 'provider_outcome_unknown' };

export type DurableDeliveryStore = {
  claimPublish(limit: number): Promise<PublishLease[]>;
  markPublished(lease: PublishLease): Promise<void>;
  releasePublish(lease: PublishLease): Promise<void>;
  claimSend(id: string): Promise<SendClaim>;
  finishSend(lease: SendLease, outcome: SendOutcome): Promise<boolean>;
  retainExpiredAttempts(limit: number): Promise<number>;
};

export type DeliveryTransport = {
  publish(id: string): Promise<void>;
  peek(limit: number): Promise<string[]>;
  acknowledge(id: string): Promise<void>;
  defer(id: string): Promise<void>;
};

export const isDeliveryId = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export function batchLimit(value: number): number {
  if (!Number.isInteger(value) || value < 1 || value > 5) throw new Error('invalid_batch_limit');
  return value;
}
