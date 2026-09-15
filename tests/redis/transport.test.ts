import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { createConnection } from 'node:net';
import { after, test } from 'node:test';

const address = new URL(process.env.TEST_REDIS_URL ?? 'http://missing.invalid');
assert.equal(address.protocol, 'redis:');
assert.ok(['127.0.0.1', 'localhost'].includes(address.hostname), 'An explicit loopback synthetic Redis is required');
assert.equal(address.username + address.password + address.pathname, '');
const prefix = `connectsphere_test_${randomUUID()}`;

// A bounded RESP adapter lets the installed REST SDK exercise an actual Redis
// engine in CI. It is test infrastructure, never an application proxy.
function redis(command: unknown[]): Promise<unknown> {
  const values = command.map((value) => Buffer.from(String(value)));
  const request = Buffer.concat([Buffer.from(`*${values.length}\r\n`), ...values.flatMap((value) => [
    Buffer.from(`$${value.length}\r\n`), value, Buffer.from('\r\n'),
  ])]);
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host: address.hostname, port: Number(address.port || 6379) });
    let received = Buffer.alloc(0);
    socket.setTimeout(3000, () => socket.destroy(new Error('Synthetic Redis timeout')));
    socket.on('error', reject);
    socket.on('connect', () => socket.write(request));
    socket.on('data', (chunk) => {
      received = Buffer.concat([received, chunk]);
      if (received.length > 131072) { socket.destroy(new Error('Synthetic response bound')); return; }
      let offset = 0;
      const parse = (): unknown => {
        const end = received.indexOf('\r\n', offset);
        if (end < 0) throw new RangeError('incomplete');
        const type = String.fromCharCode(received[offset]!);
        const value = received.toString('utf8', offset + 1, end);
        offset = end + 2;
        if (type === '-') throw new Error(value);
        if (type === '+') return value;
        if (type === ':') return Number(value);
        if (type === '$') {
          const length = Number(value);
          if (length === -1) return null;
          if (offset + length + 2 > received.length) throw new RangeError('incomplete');
          const text = received.toString('utf8', offset, offset + length);
          offset += length + 2; return text;
        }
        if (type === '*') return Array.from({ length: Number(value) }, () => parse());
        throw new Error('Unexpected RESP type');
      };
      try { const result = parse(); socket.end(); resolve(result); }
      catch (error) { if (!(error instanceof RangeError)) socket.destroy(error as Error); }
    });
  });
}

const server = createServer(async (request, response) => {
  try {
    const chunks: Buffer[] = []; let size = 0;
    for await (const chunk of request) {
      size += chunk.length;
      if (size > 131072) throw new Error('Synthetic request bound');
      chunks.push(chunk);
    }
    const command = JSON.parse(Buffer.concat(chunks).toString()) as unknown[];
    const key = String(command[command[0] === 'eval' ? 3 : 1]);
    assert.ok(key.startsWith(prefix));
    const result = await redis(command);
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ result }));
  } catch { response.statusCode = 500; response.end(JSON.stringify({ error: 'Synthetic gateway failure' })); }
});
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
const bound = server.address(); assert.ok(bound && typeof bound !== 'string');
Object.assign(process.env, {
  UPSTASH_REDIS_REST_URL: `http://127.0.0.1:${bound.port}`,
  UPSTASH_REDIS_REST_TOKEN: 'synthetic-queue-credential',
  UPSTASH_REDIS_QUEUE_NOTIFICATIONS: prefix,
});
const { createDeliveryTransport, inspectLegacyNotificationQueue } = await import('../../backend/src/providers/durableRedis.js');
const queue = createDeliveryTransport();
const versioned = `${prefix}:delivery-ids:v2`;

test('real Redis preserves legacy bytes while versioned pointers survive peek, defer and acknowledgement', async () => {
  const legacy = JSON.stringify({ to: 'retained@example.invalid', html: '<p>Synthetic retained history</p>' });
  await redis(['LPUSH', prefix, legacy]);
  assert.deepEqual(await inspectLegacyNotificationQueue(), { total: 1, sampledBytes: [Buffer.byteLength(legacy)] });
  const first = randomUUID(); const second = randomUUID();
  await queue.publish(first); await queue.publish(second);
  assert.deepEqual(await queue.peek(5), [second, first]);
  assert.equal(await redis(['LLEN', versioned]), 2);
  await queue.defer(first);
  assert.deepEqual(await queue.peek(1), [second]);
  await queue.publish(first);
  await queue.acknowledge(first);
  assert.deepEqual(await queue.peek(5), [second]);
  await queue.acknowledge(second);
  assert.deepEqual(await redis(['LRANGE', prefix, 0, -1]), [legacy]);
});

test('real Redis Lua enforces the 1000-pointer capacity without deleting retained contents', async () => {
  const ids = Array.from({ length: 999 }, () => randomUUID());
  await redis(['RPUSH', versioned, ...ids]);
  await Promise.allSettled([queue.publish(randomUUID()), queue.publish(randomUUID())]);
  assert.equal(await redis(['LLEN', versioned]), 1000);
  await assert.rejects(queue.publish(randomUUID()), /transport_capacity_reached/);
  assert.deepEqual(await redis(['LRANGE', versioned, 1, 999]), ids);
  assert.equal(await redis(['LLEN', prefix]), 1);
});
