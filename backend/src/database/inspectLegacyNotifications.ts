import { inspectLegacyNotificationQueue } from '../providers/durableRedis.js';

try {
  console.log(JSON.stringify(await inspectLegacyNotificationQueue()));
} catch {
  console.error('Legacy notification inventory unavailable; no records were modified.');
  process.exitCode = 1;
}
