import { Redis } from '@upstash/redis';
import { requireEnv, runtimeConfig } from '../config.js';
import { batchLimit, isDeliveryId } from '../modules/notificationDispatcher/durable.js';
import type { DeliveryTransport } from '../modules/notificationDispatcher/durable.js';

// The old raw-email list is deliberately untouched. Only committed PostgreSQL
// delivery IDs use this versioned transport; all payload/history stays in SQL.
function notificationRedis() {
  return new Redis({
    url: requireEnv(runtimeConfig.upstashRedisRestUrl, 'UPSTASH_REDIS_REST_URL'),
    token: requireEnv(runtimeConfig.upstashRedisRestToken, 'UPSTASH_REDIS_REST_TOKEN'),
    automaticDeserialization: false,
    enableAutoPipelining: false,
    responseEncoding: false,
    // This SDK maps `false` to one retry. Zero explicitly means one request.
    retry: { retries: 0 },
    signal: () => AbortSignal.timeout(3000),
  });
}

// Read at most five lengths, never return raw email bodies or alter the legacy
// list. This inventory is a prerequisite for a separately verified SQL import.
export async function inspectLegacyNotificationQueue(limit = 5) {
  const result = await notificationRedis().eval(`local total = redis.call('LLEN', KEYS[1])
    local sizes = {}
    for i = 0, math.min(total, tonumber(ARGV[1])) - 1 do
      sizes[#sizes + 1] = string.len(redis.call('LINDEX', KEYS[1], i))
    end
    return {total, sizes}`, [runtimeConfig.notificationQueueName], [batchLimit(limit)]);
  const [total, sampledBytes] = result as [number, number[]];
  return { total, sampledBytes };
}

export function createDeliveryTransport(): DeliveryTransport {
  const redis = notificationRedis();
  const key = `${runtimeConfig.notificationQueueName}:delivery-ids:v2`;
  return {
    async publish(id) {
      if (!isDeliveryId(id)) throw new Error('invalid_delivery_id');
      const accepted = await redis.eval(`if redis.call('LLEN', KEYS[1]) >= 1000 then return 0 end
        redis.call('LPUSH', KEYS[1], ARGV[1]); return 1`, [key], [id]);
      if (accepted !== 1) throw new Error('transport_capacity_reached');
    },
    async peek(limit) {
      return redis.lrange<string>(key, -batchLimit(limit), -1);
    },
    async acknowledge(id) {
      if (!isDeliveryId(id)) throw new Error('invalid_delivery_id');
      // Repeated relay publication can create duplicate pointers, never a new
      // delivery. Remove them only after the database retains a final outcome.
      await redis.lrem(key, 0, id);
    },
    async defer(id) {
      if (!isDeliveryId(id)) throw new Error('invalid_delivery_id');
      await redis.eval(`local n = redis.call('LREM', KEYS[1], 1, ARGV[1])
        if n > 0 then redis.call('LPUSH', KEYS[1], ARGV[1]) end
        return n`, [key], [id]);
    },
  };
}
