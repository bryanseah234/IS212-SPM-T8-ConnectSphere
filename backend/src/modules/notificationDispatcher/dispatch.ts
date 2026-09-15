import { batchLimit, isDeliveryId } from './durable.js';
import type { DeliveryTransport, DurableDeliveryStore, SendLease, SendOutcome } from './durable.js';

export async function publishCommittedDeliveries(
  store: DurableDeliveryStore, transport: DeliveryTransport, limit = 5,
) {
  const leases = await store.claimPublish(batchLimit(limit));
  let published = 0;
  let retained = 0;
  for (const lease of leases) {
    try {
      await transport.publish(lease.id);
      await store.markPublished(lease);
      published++;
    } catch {
      // An ambiguous Redis response may leave a duplicate pointer. PostgreSQL
      // claims deduplicate delivery, so keep the source row retryable.
      await store.releasePublish(lease).catch(() => undefined);
      retained++;
    }
  }
  return { published, retained };
}

export async function dispatchCommittedDeliveries(
  store: DurableDeliveryStore,
  transport: DeliveryTransport,
  send: (lease: SendLease) => Promise<SendOutcome>,
  limit = 5,
) {
  batchLimit(limit);
  const expired = await store.retainExpiredAttempts(limit);
  const ids = await transport.peek(limit);
  const summary = { sent: 0, retained: expired, retry: 0, busy: 0, invalid: 0, acknowledged: 0 };
  for (const id of new Set(ids)) {
    if (!isDeliveryId(id)) { summary.invalid++; continue; }
    const claim = await store.claimSend(id);
    if (claim.kind === 'missing') { summary.invalid++; continue; }
    if (claim.kind === 'busy') {
      await transport.defer(id);
      summary.busy++;
      continue;
    }
    if (claim.kind === 'retained') {
      await transport.acknowledge(id);
      summary.acknowledged++;
      continue;
    }
    let outcome: SendOutcome;
    try { outcome = await send(claim.lease); }
    catch { outcome = { kind: 'uncertain', code: 'provider_outcome_unknown' }; }
    // An unavailable database leaves the pointer and send lease intact. A later
    // pass records uncertainty; it never guesses that the email was not sent.
    if (!await store.finishSend(claim.lease, outcome)) { summary.retained++; continue; }
    if (outcome.kind === 'sent') summary.sent++;
    else if (outcome.kind === 'retry' && claim.lease.attempts < 5) {
      summary.retry++;
      await transport.defer(id);
      continue;
    } else summary.retained++;
    await transport.acknowledge(id);
    summary.acknowledged++;
  }
  return summary;
}
