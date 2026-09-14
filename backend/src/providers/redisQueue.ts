import { Redis } from '@upstash/redis';
import { requireEnv, runtimeConfig } from '../config';
import type { EmailJob } from './brevo';

function createRedis() {
  return new Redis({
    url: requireEnv(runtimeConfig.upstashRedisRestUrl, 'UPSTASH_REDIS_REST_URL'),
    token: requireEnv(runtimeConfig.upstashRedisRestToken, 'UPSTASH_REDIS_REST_TOKEN'),
  });
}

export async function enqueueEmail(job: EmailJob) {
  const redis = createRedis();
  const item = JSON.stringify({
    ...job,
    queuedAt: new Date().toISOString(),
  });

  return redis.lpush(runtimeConfig.notificationQueueName, item);
}

export async function dequeueEmailBatch(limit = 5): Promise<EmailJob[]> {
  const redis = createRedis();
  const jobs: EmailJob[] = [];

  for (let index = 0; index < limit; index += 1) {
    const raw = await redis.rpop<string>(runtimeConfig.notificationQueueName);
    if (!raw) {
      break;
    }

    jobs.push(JSON.parse(raw) as EmailJob);
  }

  return jobs;
}
