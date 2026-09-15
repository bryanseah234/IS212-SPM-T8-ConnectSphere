import { randomBytes, scrypt as derive, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt = promisify(derive);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64) as Buffer;
  return `scrypt:${salt}:${key.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, salt, encoded] = stored.split(':');
  const valid = scheme === 'scrypt' && /^[a-f0-9]{32}$/.test(salt || '') && /^[a-f0-9]{128}$/.test(encoded || '');
  // Perform the same expensive operation for unknown accounts and unsupported hashes.
  const key = await scrypt(password, valid ? salt : '0'.repeat(32), 64) as Buffer;
  return valid && timingSafeEqual(key, Buffer.from(encoded, 'hex'));
}
